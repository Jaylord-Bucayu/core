import { Application } from "express";

import { getSectionsList,createSection,getSection,editSection,addSectionParticular,getParticularList } from "../controllers/section.controller";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function SectionRoute(app: Application) {

     /**
    * payments list
    **/
    app.get("/sections",
    getSectionsList
    );

    app.get("/sections/:id",
    getSection
    )

    app.patch("/sections/:id",
    editSection
    )


    app.post("/sections/create",
    createSection
    )

    app.post('/sections/particular/create/:id',addSectionParticular)


    app.get('/particulars',getParticularList)

}
