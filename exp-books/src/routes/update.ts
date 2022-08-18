import express ,{NextFunction, Request,Response} from 'express';
import {body} from 'express-validator';
import { validateRequest,NotFoundError,requireAuth,NotAuthorizedError } from '@taobooks/common';
import { Book } from '../models/book';
import { BookUpdatedPublisher } from '../events/publishers/book-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put("/api/books/:id",
requireAuth,
[
    body('isbn')
    .isString()
    .withMessage('isbn must be provided'),
    body('title')
    .isString()
    .withMessage("title must be provided"),
    body('author')
    .isString()
    .withMessage("author must be provided"),
    body('price')
    .isFloat({gt:0})
    .withMessage('price is not incorrect format')
],
validateRequest,
async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const book = await Book.findById(req.params.id);
        if(!book){
            throw new NotFoundError();
        }
        if(book.userId != req.currentUser!.id){
            throw new NotAuthorizedError();
        }
        book.set({
            isbn : req.body.isbn,
            title  : req.body.title,
            author : req.body.author,
            description:req.body.description,
            price: req.body.price ,
            userId:req.currentUser!.id
        });
        await book.save();
        await new BookUpdatedPublisher(natsWrapper.client).publish({
            id:book.id!,
            isbn:book.isbn,
            title:book.title,
            author:book.author,
            description:book.description,
            price:book.price,
            userId:book.userId
        });
    
        res.send(book);
    }catch(err:any){
        next(err)
    }
   
});
export {router as updateBookRouter}