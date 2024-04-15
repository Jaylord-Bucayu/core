import { Application } from "express";

import {
    signUserInWithEmailPassword,
    currentUser
} from "../controllers/auth.controller";

export function authRoutes(app: Application) {

     /**
    * sign user
    **/
    app.post("/login",
    signUserInWithEmailPassword
);

app.post("/currentUser",
currentUser
);


app.post("/register",signUserInWithEmailPassword)


}
