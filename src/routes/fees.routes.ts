import { Application } from "express";

import { getFeesList , getFeesById, createFee,deleteFee,editFee,getFeesListStudent } from "../controllers/fees.controller";
// import auth from '../middleware/auth';
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


     app.get("/fees/student/:id",
     getFeesListStudent)

     /**
    * payments create
    **/
     app.post("/fees/create",
     createFee
     );

     app.delete("/fees/:id",
     deleteFee
     );


     app.patch("/fees/:id",
     editFee
     );










}
