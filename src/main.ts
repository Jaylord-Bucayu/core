
import express  from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

import { authRoutes } from "./routes/auth.routes"
import {PaymentsRoute} from './routes/payments.routes'
import { UsersRoute } from "./routes/user.routes";

import initializeMongoose from './config/mongoose';

const app = express();
const port = 5000;
// Enable CORS
app.use(cors());
app.use(bodyParser.json());

initializeMongoose();
authRoutes(app);
PaymentsRoute(app);
UsersRoute(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
