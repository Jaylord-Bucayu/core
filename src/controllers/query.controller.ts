import { Request, Response } from "express";
import Query from '../models/query';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function createQuery(req:Request, res: Response) {

  const body = req.body

  console.log({body})

  const new_query = new Query(body);
  await new_query.save();

  res.send(new_query)

}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getQueryList(req:Request, res: Response){

  const body = req.body;

  const query = await Query.find(body);

  res.send(query);

}

export async function getQueryParent(req:Request, res: Response) {

  try {
    const params = req.params;

  const query = await Query.find({transaction:params?.id});

  res.send(query);

  } catch (error) {
     console.log(error.message)
     res.send(error)
    }

}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getQuery(req:Request, res: Response){

  const params = req.params;

  const query = await Query.findById(params.id);

  res.send(query);

}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function editQuery(req:Request, res: Response){

  const params = req.params;
  const body = req.body;

  const query = await Query.findByIdAndUpdate(params.id,body);

  res.send(query);

}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function deleteQuery(req:Request, res: Response){

  const params = req.params;
  const body = req.body;

  await Query.findByIdAndDelete(params.id,body);

  res.send({message:"deleted"});

}


