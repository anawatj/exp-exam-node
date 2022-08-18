import express from 'express';
import json from 'body-parser';

import cookieSession from "cookie-session";
import {errorHandler,currentUser} from '@taobooks/common';
import { NotFoundError } from '@taobooks/common';
import { createOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';
import { updateOrderRouter } from './routes/update';
import { deleteOrderRouter } from './routes/delete';
import { approveOrderRouter } from './routes/approve';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);
app.use(createOrderRouter);
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(updateOrderRouter);
app.use(deleteOrderRouter);
app.use(approveOrderRouter);
app.all('*', async (req, res,next) => {
  next(new NotFoundError());
});
app.use(errorHandler);
export {app};