import { Subjects } from "./subjects";

export interface BookCreatedEvent {
    subject:Subjects.BookCreated;
    data:{
        id: String ,
        isbn: String,
        title: String,
        author:String,
        description:String,
        price:Number,
        userId:String 
    };
}