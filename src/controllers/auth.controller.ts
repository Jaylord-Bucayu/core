
import { Request, Response } from "express";
import User from '../models/user';
import Auth from '../models/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


function decodeJWT(token:string) {
    const parts = token.split('.');
    if(!token){
        const decodedPayload = atob(parts[1]);
        return JSON.parse(decodedPayload);
    }
    // if (parts.length !== 3) {
    //     throw new Error('Invalid JWT format');
    // }

    const decodedPayload = atob(parts[1]);
    return JSON.parse(decodedPayload);
}


export async function currentUser(req: Request, res: Response) {

    let token:string = "";
 // Get the authorization header
 const authHeader = req.headers['authorization'];

 // Check if the authorization header exists and contains a bearer token
 if (authHeader && authHeader.startsWith('Bearer ')) {
     // Extract the token
     token = authHeader.substring(7); // Remove 'Bearer ' prefix
 }
   
  const auth = decodeJWT(token);




    var user = await User.findByIdAndUpdate(auth.auth, {}, { new: true, upsert: true });

    res.send({
        'status': 'success',
        'message': 'Query success',
        'data': {
            ...user.toJSON(),
        }
    });
}
export async function signUserInWithEmailPassword(req: Request, res: Response) {


    const appKey = process.env.APP_KEY;

if (!appKey) {
  throw new Error('APP_KEY environment variable is not defined');
}

    const data = req.body;
    if (data.username !== undefined && data.username !== null) {
        data.username = data.username.toLowerCase();
    }
    

    if (data.email !== undefined && data.email !== null) {
        data.email = data.email.toLowerCase();
    }
    
        
        let auth = null;

        if (data.email != null) {
            // console.log('Finding email...');
            auth = await Auth.findOne({ email: data.email }).select('+password');
        } else if (data.username != null) {
            auth = await Auth.findOne({
                username: data.username.toString().toLowerCase(),
            }).select('+password');
        } else if (data.mobile != null) {
            // console.log('Finding mobile...');
            auth = await Auth.findOne({
                'mobile.cc': data.country_code.toString(),
                'mobile.m': data.mobile.toString(),
            }).select('+password');
        } else {
            return res.send(
            'You must login with either email, mobile number, or username.'
            );
        }

        // console.log(auth);

        if (auth == null) {
            return res.send(
                'We can\'t find an account associated with this credential.'
             );
        }

        if (!await bcrypt.compare(data.password, auth.password)) {
            return res.send('Credentials are incorrect.');
        }

    const token = jwt.sign({ auth: auth.id.toString() }, appKey, {
            expiresIn: '30d',
        });

        res.cookie('jwt', token, {
            secure: process.env.APP_ENV !== 'development',
            httpOnly: true,
            sameSite: 'strict',
        });

        auth.lastActive = new Date();
        await auth.save();

        auth = auth.toJSON();
        // delete auth?.password;

       await User.findByIdAndUpdate(
            auth.id,
            {},
            { new: true, upsert: true }
        );

        
        res.send({
            'status': 'success',
            'message': 'Login successfully',
            'data': auth,
             'token':token,
             
            });
  

}