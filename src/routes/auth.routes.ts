import { Application } from "express";

import {
    signUserInWithEmailPassword
} from "../controllers/auth.controller";

export function authRoutes(app: Application) {

     /**
    * sign user
    **/
    app.get("/sign_in",
    signUserInWithEmailPassword
);

    
}