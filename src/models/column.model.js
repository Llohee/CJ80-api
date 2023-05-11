import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../config/mongodb'

//definr Column collection 
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updateddAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOne({ _id: new ObjectId(id) })
    return result

  } catch (error) {
    throw new Error(error)

  }
}




const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId: new ObjectId(validatedValue.boardId)
    }

    const result = await getDB().collection(columnCollectionName).insertOne(insertValue)

    return result
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 * 
 * @param {string} columnId 
 * @param {string} cardId 
 */
const pushCardOder = async (columnId, cardId) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: new ObjectId(columnId) },
      { $push: { cardOrder: cardId } },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
    }
    if (data.boardId) {
      updateData.boardId = new ObjectId(data.boardId)
    }
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    return result

  } catch (error) {
    throw new Error(error)
  }
}


export const ColumnModel = { columnCollectionName, createNew, update, pushCardOder, findOneById }