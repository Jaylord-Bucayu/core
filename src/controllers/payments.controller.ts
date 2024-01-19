
import { Request, Response } from "express";

export async function getPaymentsList(_:Request, res: Response) {

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


export async function getPaymentsById(_:Request, res: Response) {

    const data = 
     {
       "id": 1,
       "title": "Spanish"
     }
     
 
     res.send(data)
 
 }