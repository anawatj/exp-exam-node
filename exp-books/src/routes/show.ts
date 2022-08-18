import { NotFoundError } from '@taobooks/common';
import express,{NextFunction, Request,Response} from 'express';
import { Book } from '../models/book';

const router = express.Router();
router.get("/api/books/:id", async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const book = await Book.findById(req.params.id);
        if(!book){
            throw new NotFoundError();
        }
        res.send(book);
    }catch(err :any){
        next(err)
    }
   
});

export {router as showBookRouter}