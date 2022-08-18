import { Subjects } from "./subjects";

export interface BookUpdatedEvent {
    subject:Subjects.BookUpdated
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