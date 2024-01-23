
import { Request, Response } from "express";
import Section from '../models/section';

export async function getSectionsList(req: Request, res: Response) {

    const data = req.body;
    const sections = await Section.find(data);

    res.send(sections)

}

export async function getSection(req: Request, res: Response) {


    const params = req.params
    const sections = await Section.findById(params.id);

    res.send(sections)

}

export async function editSection(req: Request, res: Response) {

    const data = req.body;
    const params = req.params
    const sections = await Section.findByIdAndUpdate(params.id, {
        $set: {
            ...data
        },
        }, { upsert: true });
   
    res.send(sections)

}




export async function createSection(req: Request, res: Response) {

    const data = req.body;
    const sections = new Section(data);

    await sections.save();

    res.send(sections)

}