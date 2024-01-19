import { Application } from "express";

import { getStudentsList , getStudentById, createUser, getUsersList, } from "../controllers/user.controller";

export function UsersRoute(app: Application) {

     /**
    * payments list
    **/
    app.get("/users",
    getUsersList
    );

     /**
    * payments show
    **/
     app.get("/users/show/:id",
     getStudentById
     );

     /**
      *create User *
      **/

      app.post("/users/create",
      createUser
      )


      app.get("/students",
      getStudentsList)

      app.get("/students/:id",getStudentById)

    
}