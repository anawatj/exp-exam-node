import { NotFoundError } from '@taobooks/common';
import express,{NextFunction, Request,Response} from 'express';
import { Order } from '../models/order';

const router = express.Router();
router.get("/api/orders/:id", async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            throw new NotFoundError();
        }
        res.send(order);
    }catch(err :any){
        next(err)
    }
   
});

export {router as showOrderRouter}