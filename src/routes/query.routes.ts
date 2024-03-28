import { Application } from "express";

import {
    createQuery,
    getQueryList,
    getQuery,
    editQuery

} from "../controllers/query.controller";

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
