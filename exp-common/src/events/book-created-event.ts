import { Subjects } from "./subjects";

export interface BookCreatedEvent {
    subject:Subjects.BookCreated;
    data:{
        id: String ,
        version: Number,
        isbn: String,
        title: String,
        author:String,
        description:String,
        price:Number,
        qty:Number,
        userId:String 
    };
}