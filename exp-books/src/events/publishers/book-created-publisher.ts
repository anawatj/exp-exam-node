import {Publisher, BookCreatedEvent, Subjects } from "@taobooks/common";

export class BookCreatedPublisher extends Publisher<BookCreatedEvent>{
    subject: Subjects.BookCreated=Subjects.BookCreated
}