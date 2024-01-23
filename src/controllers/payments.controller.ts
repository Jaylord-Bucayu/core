
import { Request, Response } from "express";
import Payment from '../models/payment';

export async function getPaymentsList(req:Request, res: Response) {

  const data = req.body;
  const payment = await Payment.find(data).populate('student').populate('parent');
  res.send(payment)

}


export async function getPaymentsById(req:Request, res: Response) {

   const params = req.params;

   const payment = await Payment.findById(params).populate('user').populate('parent');
     
   res.send(payment)
 
 }


 export async function createPayment(req:Request, res: Response) {

  const data = req.body;

  const payment = new Payment(data);

  await payment.save();
    
  res.send(payment)

}

