import { BookUpdatedEvent, Listener, Subjects } from "@taobooks/common";
import { Message } from "node-nats-streaming";
import { Book } from "../../models/book";
import { queueGroupName } from "./queue-group-name";

export class BookUpdatedListener extends Listener<BookUpdatedEvent>{
    subject: Subjects.BookUpdated = Subjects.BookUpdated;
    queueGroupName=queueGroupName;
    async onMessage(data:BookUpdatedEvent["data"],msg:Message){
        const { id,version, isbn, title, author, description, price,qty, userId } = data;
        const book =await Book.findOne({id});
        if(!book){
            throw new Error("book not found")
        }
        book.set({
            isbn:isbn,
            title:title,
            author:author,
            description:description,
            price:price,
            qty:qty,
            userId:userId

        });
        await book.save();
        msg.ack();
    }
}