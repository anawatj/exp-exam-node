import { NotFoundError, OrderStatus } from '@taobooks/common';
import express,{NextFunction, Request,Response} from 'express';
import { OrderApprovePublisher } from '../events/publishers/order-approved-publisher';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();
router.put("/api/orders/:id/approve", async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            throw new NotFoundError();
        }
        order.set({
            orderStatus:OrderStatus.Paid
        });
        await order.save();
        const items = order.items;
        await new OrderApprovePublisher(natsWrapper.client).publish(items);
        res.send(order);
    }catch(err :any){
        next(err)
    }
   
});

export {router as approveOrderRouter}