
import { Request, Response } from "express";
import Section from '../models/section';
import User from '../models/user';
import Fee from '../models/fees';
import Particular from "../models/particular";

// import Mailer from '../config/mailer'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

export async function getParticularList(req: Request, res: Response) {

  const data = req.body;

  const particular = await Particular.find(data).populate('section');

  res.send(particular);

}



export async function addSectionParticular(req: Request, res:Response){

    const params = req.params
    const body = req.body;

    const section = await Section.findById(params.id);


   if(section){

    const particular = new Particular({
      amount: body.amount,
      particulars: body.particulars,
      section:section.id,
      dueDate:body.dueDate
      });


  // Save the fee to the database or perform any other necessary operations
  await particular.save();


    const students = await User.find({section:section.section_name}).populate('parent');

    // Assuming students is an array of User objects
    for (const student of students) {
        const fee = new Fee({
        amount: body.amount,
        particulars: body.particulars,
        student: student.id, // Access the id property of each student
        section:section.id,
        dueDate:body.dueDate
        });


    // Save the fee to the database or perform any other necessary operations
    await fee.save();


    // Send email for each student
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment


    //Mailer.sendMail(student?.parent?.email, 'Fee Added', `Your fee for ${body.particulars} with a amount of ${body.amount} has been added.`); // Assuming you have access to student's email

    // Wait for 30 seconds before sending the next email
    //await new Promise(resolve => setTimeout(resolve, 30000));

   }



   res.send('fee added')

   }


}
