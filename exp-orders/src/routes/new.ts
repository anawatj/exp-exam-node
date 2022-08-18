import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { requireAuth, validateRequest } from '@taobooks/common';
import { Order } from '../models/order';
import { natsWrapper } from "../nats-wrapper";
import { OrderStatus } from '@taobooks/common/build/types/order-status';
const router = express.Router()
router.post("/api/orders",
requireAuth,
[
    body('orderName')
    .isString()
    .withMessage('orderName must be provided'),
    body('orderDate')
    .isDate()
    .withMessage("orderDate must be provided"),
    body('orderAmount')
    .isFloat({gt:0})
    .withMessage("orderAmount must be provided"),
    body('shipName')
    .isString()
    .withMessage('shipName is not incorrect format'),
    body('shipAddress')
    .isString()
    .withMessage('shipAddress is not incorrect format'),
    body('items')
    .isArray()
    .withMessage("items must be provided")
],
validateRequest,
async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {orderName,orderDate,orderAmount,shipName,shipAddress,items} = req.body;
        const order = Order.build({
            orderName,
            orderDate,
            orderAmount,
            orderStatus:OrderStatus.Waiting,
            shipName,
            shipAddress,
            items,
            userId:req.currentUser!.id
        });
        await order.save()
        res.status(201).send(order);
    }catch(err:any){
        next(err);
    }
   
}
);
export {router as createOrderRouter}