import { Application } from "express";

import {
    createQuery,
    getQueryList,
    getQuery,
    editQuery

} from "../controllers/query.controller";
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function queryRoutes(app: Application) {

  app.post("/query",
  createQuery
  );

  app.get("/query",
  getQueryList
  );

  app.get("/query/:id",
  getQuery
  );

  app.patch("/query/:id",
  editQuery
  );
}
