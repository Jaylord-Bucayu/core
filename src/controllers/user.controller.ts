
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

//MODELS
import User from '../models/user';
import Auth from '../models/auth'
import Fee from '../models/fees';
import Mailer from '../config/mailer'


//UTILS
 import { formatDate } from '../utils/index'

export async function getStudentsList(_:Request, res: Response) {
 //const data = req.body;


 const users = await Auth.find({ 'role': 'student' }).populate('user')
res.send(users)


}


export async function getStudentById(req:Request, res: Response) {

 const params = req.params

  const user = await Auth.findById(params.id).populate('user');
  res.send(user)

 }





export async function createUser(req:Request, res: Response) {
    const data = req.body;

    try {

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

        return res.send(error);

    }


}



export async function createStudent(req:Request, res: Response) {
  const data = req.body;

  try {

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
          firstname: data.firstname,
          middlename: data.middlename,
          lastname: data.lastname,
          birthdate:data.birthdate,
          gender:data.gender,
          section:data.section,
          studentId: data.studentId
      });

      await user.save();

       Mailer.sendMail(data.email,'Portal Account credentials', `To check your fees login to the https://client-weld-eight.vercel.app Your password is ${formatDate(data.birthdate)} `); // Assuming you have access to student's email


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
          lastname: data.parent.lastname
      });

      await parent_user.save();

      user.parent = parent_auth.id;
      await user.save();

      Mailer.sendMail(data.parent.email,'Portal Account credentials', `To check your children fees login to the https://client-weld-eight.vercel.app Your password is ${data.parent.email} `); // Assuming you have access to student's email

       res.send('user created')


  } catch (error) {
     console.log(error)
      return res.status(500).send(error);

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

  res.send('fee added');


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

  const params = req.params

   await Auth.findByIdAndDelete(params.id);
   await User.findByIdAndDelete(params.id);


   res.send({message:"Deleted User"})

 }
