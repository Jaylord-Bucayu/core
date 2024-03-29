import { Application } from "express";

import {
    createQuery,
    getQueryList,
    getQuery,
    editQuery,
    deleteQuery,
    getQueryParent

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

  app.get("/query/parent/:id",
  getQueryParent)

  app.patch("/query/:id",
  editQuery
  );

  app.delete("/query/:id",
  deleteQuery
  );

}
