import express from 'express';
import json from 'body-parser';

import cookieSession from "cookie-session";
import {errorHandler,currentUser} from '@taobooks/common';
import { NotFoundError } from '@taobooks/common';
import { createBookRouter } from './routes/new';
import { showBookRouter } from './routes/show';
import { indexBookRouter } from './routes/index';
import { updateBookRouter } from './routes/update';
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
app.use(createBookRouter);
app.use(showBookRouter);
app.use(indexBookRouter);
app.use(updateBookRouter);
app.all('*', async (req, res,next) => {
  next(new NotFoundError());
});
app.use(errorHandler);
export {app};