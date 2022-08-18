import { Subjects } from "./subjects";

export interface OrderApprovedEvent {
    subject:Subjects.OrderApproved;
    data:[{
        bookId:String ,
        orderQty:Number
    }]
}