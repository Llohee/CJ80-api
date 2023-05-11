import { MongoClient } from 'mongodb'
import { env } from '*/config/environtment'

let dbInstance = null


export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: false,
    useNewUrlParser: true
  })

  //connect the client to the server
  await client.connect()

  //assign clientDB 
  dbInstance = client.db('Trello-Web')    
}
//Get Database instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to database first')
  return dbInstance
}

