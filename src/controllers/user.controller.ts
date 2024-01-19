
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

//MODELS
import User from '../models/user';
import Auth from '../models/auth'

export async function getStudentsList(_:Request, res: Response) {
 //const data = req.body;

 
 const users = await Auth.find({ 'role': 'student' }).populate({
  path: 'user',
  select: 'email mobile fullname data.email data.mobile data.fullname'
})
res.send(users) 
   

}


export async function getStudentById(req:Request, res: Response) {

 const params = req.params

  const user = await Auth.findById(params.id).populate('user');
     
    console.log(user)
     res.send(user)
 
 }



export async function createUser(req:Request, res: Response) {
    const data = req.body;
 
    try {
        const auth = new Auth({
            email: data.email,
            username: data.username,
            mobile: data.mobile,
            role: data.role,
            password: bcrypt.hashSync(data.password, 10),
        });

        await auth.save();

        const user = new User({
            _id: auth.id,
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            parent: data.parent
        });

        await user.save();

        return res.send('user created')


    } catch (error) {

        return res.send(error);
        
    }


}

export async function getUsersList(_:Request, res: Response) {

  const users = await User.find();

   res.send(users)

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