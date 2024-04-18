/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Request, Response } from "express";
import bcrypt from 'bcrypt';


//MODELS
import User from '../models/user';
import Auth from '../models/auth'
import Fee from '../models/fees';
import Section from '../models/section';
import Mailer from '../config/mailer'

import mongoose from 'mongoose';

//UTILS
 import { formatDate } from '../utils/index'

export async function getStudentsList(_:Request, res: Response) {
 //const data = req.body;


 const users = await Auth.find({ 'role': 'student' }).populate('user')
res.send(users)


}


export async function getStudentById(req:Request, res: Response) {

 const params = req.params

 const user = await Auth.findById(params.id).populate({
  path: 'user',
  populate: {
      path: 'parent' // Populate the 'parent' field within the 'user' document
  }
});

const parent_user = await User.findById(params.id);
const parent = await Auth.findById(parent_user?.parent).populate('user')

const data = {
  parent,
  user
}

  res.send(data)

 }





export async function createUser(req:Request, res: Response) {
    const data = req.body;

    try {

  const findEmailStudent = await Auth.find({email:data.email});
  const findEmailParent = await Auth.find({email:data.parent.email});

  if(findEmailStudent || findEmailParent){
    return res.status(500).send({message:"Email for student or parent has already been used by other account"});
  }


  const findPhoneStudent = await Auth.find({mobile:data.mobile});
  const findPhoneParent = await Auth.find({mobile:data.parent.mobile});

  if(findPhoneStudent || findPhoneParent){
    return res.status(500).send({message:"Phone number for student or parent has already been used by other account"});
  }


      //create student
        const auth = new Auth({
            email: data.email,
            username: data.username,
            mobile: data.mobile,
            role: 'student',
            password: bcrypt.hashSync(formatDate(data.password), 10),
        });

        await auth.save();

        const user = new User({
            _id: auth.id,
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname
        });

        await user.save();


        //create parent
        const parent_auth = new Auth({
            email: data.parent.email,
            mobile: data.parent.mobile,
            role: 'parent',
            password: bcrypt.hashSync(data.parent.email, 10),
        });

        await parent_auth.save();

        const parent_user = new User({
            _id: auth.id,
            firstname: data.parent.firstname,
            middlename: data.parent.middlename,
            lastname: data.parent.lastname
        });

        await parent_user.save();

         res.send('user created')


    } catch (error) {

        return res.send({message:error.message});

    }


}



export async function createStudent(req:Request, res: Response) {
  const data = req.body;

  try {


  const findEmailStudent = await Auth.find({email:data.email});
  const findEmailParent = await Auth.find({email:data.parent.email});

  if(findEmailStudent || findEmailParent){
    return res.status(500).send({message:"Email for student or parent has already been used by other account"});
  }

  const findPhoneStudent = await Auth.find({mobile:data.mobile});
  const findPhoneParent = await Auth.find({mobile:data.parent.mobile});

  if(findPhoneStudent || findPhoneParent){
    return res.status(500).send({message:"Phone number for student or parent has already been used by other account"});
  }



      //create parent
      const parent_auth = new Auth({
          email: data.parent.email,
          mobile: data.parent.mobile,
          role: 'parent',
          password: bcrypt.hashSync(data.parent.email, 10),
      });

      await parent_auth.save();




      const parent_user = new User({
          _id: parent_auth.id,
          firstname: data.parent.firstname,
          middlename: data.parent.middlename,
          lastname: data.parent.lastname,
          email: data.parent.email
      });

      await parent_user.save();

      //create student
      const auth = new Auth({
        email: data.email,
        username: data.username,
        mobile: data.mobile,
        role: 'student',
        password: bcrypt.hashSync(formatDate(data.birthdate), 10),
    });



    await auth.save();

    const user = new User({
        _id: auth.id,
        email: data.email,
        firstname: data.firstname,
        middlename: data.middlename,
        lastname: data.lastname,
        birthdate:data.birthdate,
        gender:data.gender,
        section:data.section,
        studentId: data.studentId,
        parent: new mongoose.Types.ObjectId(parent_auth.id)
    });


    await user.save();

    //@ts-ignore
    parent_user?.child =  new mongoose.Types.ObjectId(auth.id)
    await parent_user.save();

     Mailer.sendMail(data.email,'Portal Account credentials', `To check your fees login to the https://client-weld-eight.vercel.app Your password is ${formatDate(data.birthdate)} `); // Assuming you have access to student's email




      Mailer.sendMail(data.parent.email,'Portal Account credentials', `To check your children fees login to the https://client-weld-eight.vercel.app Your password is ${data.parent.email} `); // Assuming you have access to student's email

       res.send('user created')


  } catch (error) {
     console.log(error)
     return res.status(500).send({message:"Email for student or parent has already been used by other account"});

  }


}

export async function editStudent(req:Request, res: Response) {
  const data = req.body;
  const params = req.params;

  console.log({data,params})

   await User.findByIdAndUpdate(params.id, {
    $set: {
        ...data
    },
    }, { upsert: true });


    const auth = await Auth.findById(req.body.id);

    if(auth){
      auth.mobile = data.mobile || '';
      auth.email = data.email || '';
      auth.save();
    }

    res.send('Profiled updated successfully');


 }

export async function getUsersList(_:Request, res: Response) {

  const users = await User.find();

   res.send(users)

}




export async function addStudentParticular(req:Request,res:Response) {
  const params = req.params;
  const data = req.body;

  const addedFee = new Fee(data);
  addedFee.student = params.id!;

  await addedFee.save();

  const fee = await Fee.findById(addedFee.id).populate('student')

  const student = await User.findById(params.id).populate("parent");

 console.log({fee,student});

  //@ts-expect-error
  Mailer.sendMail(fee?.student?.email,'New Fee added to your account', `A fee for ${addedFee.particulars} amounting ${addedFee.amount} has been added to your account. To verify login to your account`); // Assuming you have access to student's email

  //@ts-expect-error
  Mailer.sendMail(student?.parent?.email,'New Fee added to your childaccount', `A fee for ${addedFee.particulars} amounting ${addedFee.amount} has been added to your account. To verify login to your account`); // Assuming you have access to student's email

  res.send(fee);


}

 export async function getParentsList(_:Request, res: Response) {

    const data = [
     {
       "id": 1,
       "title": "Spanish"
     },
     {
       "id": 2,
       "title": "English"
     },
     {
       "id": 3,
       "title": "German"
     }
   ]

     res.send(data)

 }

 export async function getParentById(_:Request, res: Response) {

    const data =
     {
       "id": 1,
       "title": "Spanish"
     }


     res.send(data)

 }

 export async function deleteStudent(req:Request, res: Response){

   try {
    const params = req.params


    const user = await User.findById(params.id);

    await Auth.findByIdAndDelete(params.id);
    await User.findByIdAndDelete(params.id);


  await Auth.findByIdAndDelete(user?.parent);

   await User.findByIdAndDelete(user?.parent);


   res.send({message:"Deleted User"})

  } catch (error) {

    res.send({message:error.message})
   }

 }


 export async function dashboard(_:Request, res: Response){

  interface StudentsPerSection {
    [section: string]: number;
}


  const students = await User.find({}); // Get all students
  const sections = await Section.find({}); // Get all sections
  const fees = await Fee.find({ status: "pending" }); // Get pending fees

  // Count the number of students per section
  const studentsPerSection: StudentsPerSection = {}; // Define the type

students.forEach(student => {
    const section = student.section;
    if (section) {
        if (section in studentsPerSection) {
            studentsPerSection[section]++;
        } else {
            studentsPerSection[section] = 1;
        }
    }
});

const studentsPerSectionArray = Object.keys(studentsPerSection).map(section => ({
  section,
  students: studentsPerSection[section]
}));

const data = {
    total_students: students.length,
    total_sections: sections.length,
    total_fees: fees.length,
    students_per_section: studentsPerSectionArray
};

  res.send(data);


 }
