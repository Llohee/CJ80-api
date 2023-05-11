import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../config/mongodb'

//definr Card collection 
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(50).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updateddAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)


})

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB().collection(cardCollectionName).findOne({ _id: new ObjectId(id) })
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
      boardId: new ObjectId(validatedValue.boardId),
      columnId: new ObjectId(validatedValue.columnId)
    }
    const result = await getDB().collection(cardCollectionName).insertOne(insertValue)

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
    if (data.columnId) {
      updateData.columnId = new ObjectId(data.columnId)
    }

    const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}
/**
 * 
 * @param {Array of string card id} ids 
 */
const deleteMany = async (ids) => {
  try {
    const transformIds = ids.map(i => new ObjectId(i))
    const result = await getDB().collection(cardCollectionName).updateMany(
      { _id: { $in: transformIds } },
      { $set: { _destroy: true } }
    )

    return result
  } catch (error) {
    throw new Error(error)

  }
}

export const CardModel = { createNew, findOneById, cardCollectionName, deleteMany, update } 