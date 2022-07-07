import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
  req,
  res,
) {
  let { db } = await connectToDatabase();
  
  const {query:{msg} = {}} = req;

  if (msg) {
    await db.collection("blog").insertOne({msg});
  }

  const result = await db.collection("blog")
    .find({})
    .toArray()
  ;
 
  const resultWithId = result
    .map(({_id, ...rest}) => ({id: _id.toString(), ...rest}))
    .reverse()
  ;

  res.status(200).json(resultWithId);
}