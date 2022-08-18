import express ,{Request,Response} from 'express';
import {body} from 'express-validator';
import { validateRequest,NotFoundError,requireAuth,NotAuthorizedError } from '@taobooks/common';
import { Book } from '../models/book';

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
async(req:Request,res:Response)=>{
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

    res.send(book);
});
export {router as updateBookRouter}