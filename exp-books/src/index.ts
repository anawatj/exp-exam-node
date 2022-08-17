import express from 'express';
import json from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from "cookie-session";
import {errorHandler,currentUser} from '@taobooks/common';
import { NotFoundError } from '@taobooks/common';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.all('*', async (req, res) => {
    throw new NotFoundError();
  });
app.use(currentUser);
app.use(errorHandler);
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();