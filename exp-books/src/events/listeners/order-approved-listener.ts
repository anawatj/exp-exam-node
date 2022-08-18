import { Listener, OrderApprovedEvent, Subjects } from "@taobooks/common";
import { Message } from "node-nats-streaming";
import { Book } from "../../models/book";
import { queueGroupName } from "./queue-group-name";

export class OrderApprovedListener extends Listener<OrderApprovedEvent>{
    subject: Subjects.OrderApproved = Subjects.OrderApproved;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderApprovedEvent["data"], msg: Message) {
        data.forEach(async (item)=>{
            const {bookId,qty} = item;
            const book = await Book.findById(bookId);
            book?.set({
                qty:book?.qty-qty.valueOf()
            });
            await book?.save()
        })
        msg.ack();


    }
}