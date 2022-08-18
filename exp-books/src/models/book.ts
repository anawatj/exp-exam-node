import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface BookAttrs{
    isbn: string,
    title: string,
    author: string,
    description:string ,
    price :number,
    qty : number ,
    userId: string 

}

interface BookDoc extends mongoose.Document {
    isbn: string,
    title: string,
    author: string,
    description:string ,
    price :number,
    qty : number,
    userId: string ,
    version: number
}

interface BookModel extends mongoose.Model<BookDoc>{
    build(attrs:BookAttrs):BookDoc
}
const bookSchema = new  mongoose.Schema({
    isbn:{
        type: String,
        required: true 
    },
    title:{
        type: String ,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    price:{
        type: Number,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
    userId:{
        type: String ,
        required: true 
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id
        }
    }
});
bookSchema.set('versionKey', 'version');
bookSchema.plugin(updateIfCurrentPlugin);
bookSchema.statics.build=(attr:BookAttrs)=>{
    return new Book(attr);
}
const Book = mongoose.model<BookDoc,BookModel>('Book',bookSchema);

export {Book};