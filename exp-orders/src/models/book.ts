import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface BookAttrs{
    id: String,
    isbn: String,
    title: String,
    author: String,
    description:String ,
    price :Number,
    qty:Number,
    userId: String 

}

interface BookDoc extends mongoose.Document {
    isbn: String ,
    title: String,
    author: String,
    description:String ,
    price :Number,
    qty : Number,
    userId: String,
    version: Number,
    isReversed():Promise<Boolean>
}

interface BookModel extends mongoose.Model<BookDoc>{
    build(attrs:BookAttrs):BookDoc;
    findByEvent(event: {
        id: String;
        version: Number;
      }): Promise<BookDoc | null>;
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
        required:true
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
bookSchema.statics.findByEvent=(event: { id: string; version: number }) => {
    return Book.findOne({
      _id: event.id,
      version: event.version - 1,
    });
  };
bookSchema.statics.build=(attr:BookAttrs)=>{
    return new Book(attr);
}
bookSchema.methods.isReserved = async function () {
    // this === the ticket document that we just called 'isReserved' on
   /* const existingOrder = await Order.findOne({
      ticket: this as any,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ],
      },
    });*/
  
    //return !!existingOrder;
  };
const Book = mongoose.model<BookDoc,BookModel>('Book',bookSchema);

export {Book};