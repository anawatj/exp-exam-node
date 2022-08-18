import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { requireAuth, validateRequest } from '@taobooks/common';
import { Book } from '../models/book';

const router = express.Router()
router.post("/api/books",
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
        const {isbn,title,author,description,price} = req.body;
        const book = Book.build({
            isbn,
            title,
            author,
            description,
            price,
            userId:req.currentUser!.id
        });
        await book.save();
        res.status(201).send(book);
    }catch(err:any){
        next(err);
    }
   
}
);
export {router as createBookRouter}