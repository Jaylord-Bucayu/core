import { Application } from "express";

import { getFeesList , getFeesById, createFee } from "../controllers/fees.controller";

export function FeesRoute(app: Application) {

     /**
    * payments list
    **/
    app.get("/fees",
    getFeesList
    );

     /**
    * payments show
    **/
     app.get("/fees/:id",
     getFeesById
     );


     /**
    * payments create
    **/
     app.post("/fees/create",
     createFee
     );


   
  




    
}