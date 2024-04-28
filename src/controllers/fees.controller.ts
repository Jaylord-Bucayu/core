
import { Request, Response } from "express";
import Fees from '../models/fees';
import User from '../models/user'
import Mailer from "src/config/mailer";


interface IStudentFeeWithTotal {
    totalAmount?: number | undefined;
  }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getFeesList(req:Request, res: Response) {

  const data = req.body;
  const payment = await Fees.find(data).populate('student')
  res.send(payment)

}

export async function getFeesListStudent(req:Request, res: Response) {

  try {
    const params = req.params;

  const payment = await Fees.find({student:params.id}).populate('student')
  res.send(payment)
  } catch (error) {
     res.status(500).send(error)
  }

}


export async function getFeesById(req:Request, res: Response) {

   const params = req.params;

   const fees = await Fees.findById(params.id)

   res.send(fees)

 }


 export async function createFee(req:Request, res: Response) {

  const data = req.body;

  const fees = new Fees(data);

  await fees.save();

  res.send(fees)

}


export async function getStudentFees(req:Request, res: Response) {

   try {
    const params = req.params;

    const parent = await User.findById(params.id);

    const fees = await Fees.find({student:parent?.child}).populate('student')
    console.log(fees)
    if(!fees){

    return res.send([])

  }

  // Calculate total amount
  const totalAmount: number = fees.reduce((total, fee) => {
  const feeAmount: number = fee.amount || 0; // Use 0 if fee.amount is null or undefined
    return total + feeAmount;
  }, 0);

  // Append totalAmount only to the last entity
  const feesWithTotal: IStudentFeeWithTotal[] = fees.map((fee, index) => ({
    ...fee.toObject(),
    totalAmount: index === fees.length - 1 ? totalAmount : undefined,
  }));

  res.send(feesWithTotal);
   } catch (error) {
      res.status(500).send(error)
   }


  }


  export async function deleteFee(req:Request, res: Response){

    const params = req.params;
    const body = req.body;

    await Fees.findByIdAndDelete(params.id,body);

    res.send({message:"deleted"});
  }


  export async function editFee(req: Request, res: Response) {
    const params = req.params;
    const body = req.body;

    const query = await Fees.findByIdAndUpdate(params.id, body).populate('student');

    const student = await User.findById(query?.id).populate('parent');

    if (body.status === 'success' && student) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const parentEmail = student.parent?.email || ''; // Ensure parent email is not undefined
      const studentEmail = student.email || ''; // Ensure student email is not undefined

      Mailer.sendMail(
        parentEmail,
        'Portal Account Fee',
        `The Payment of your children, for ${query?.particulars} with amounting ${query?.amount } has been paid`
      );

      Mailer.sendMail(
        studentEmail,
        'Portal Account Fee',
        `The payment for ${query?.particulars} with amounting ${query?.amount } has been paid`
      );
    }

    res.send(query);
  }
