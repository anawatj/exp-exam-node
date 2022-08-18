import { BookUpdatedEvent, Publisher, Subjects } from "@taobooks/common";

export class BookUpdatedPublisher extends Publisher<BookUpdatedEvent>{
    subject: Subjects.BookUpdated=Subjects.BookUpdated
}