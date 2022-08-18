import { BookCreatedEvent, Listener, Subjects } from "@taobooks/common";
import { Message } from "node-nats-streaming";
import { Book } from "../../models/book";
import { queueGroupName } from "./queue-group-name";

export class BookCreateListener extends Listener<BookCreatedEvent>{
    subject: Subjects.BookCreated = Subjects.BookCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: BookCreatedEvent["data"], msg: Message) {
        const { id, isbn, title, author, description, price,qty, userId } = data;
        const book = Book.build({
            id,
            isbn,
            title,
            author,
            description,
            price,
            qty,
            userId
        });
        await book.save();
        msg.ack();


    }
}