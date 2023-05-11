import { ColumnModel } from "../models/column.model"
import { BoardModel } from "../models/board.model"
import { CardModel } from "../models/card.model"

const createNew = async (data) => {
  try {

    const createdColumn = await ColumnModel.createNew(data)
    console.log(createdColumn)
    const getNewColumn = await ColumnModel.findOneById(createdColumn.insertedId.toString())
    console.log(getNewColumn)
    getNewColumn.cards = []
    
    //update columnOder array in boardCollection
    await BoardModel.pushColumnOder(getNewColumn.boardId.toString(), getNewColumn._id.toString())

    return getNewColumn
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateddAt: Date.now()
    }
    if(updateData._id) delete updateData._id
    if(updateData.cards) delete updateData.cards

    const updatedColumn = await ColumnModel.update(id, updateData)
    
    if (updatedColumn._destroy) {
        //delete cards 
        CardModel.deleteMany(updatedColumn.cardOder)
    }

    return updatedColumn
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const ColumnService = { createNew, update }