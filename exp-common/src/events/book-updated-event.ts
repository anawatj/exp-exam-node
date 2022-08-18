import { Subjects } from "./subjects";

export interface BookUpdatedEvent {
    subject:Subjects.BookUpdated
    data:{
        id: String ,
        version:Number,
        isbn: String,
        title: String,
        author:String,
        description:String,
        price:Number,
        qty:Number,
        userId:String 
    };
}