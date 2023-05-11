import { BoardModel } from "*/models/board.model"
import { cloneDeep } from "lodash"

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data)
    const getNewBoard = await BoardModel.findOneById(createdBoard.insertedId.toString())
    //púsh notidication 
    // do sth
    //transform data

    return getNewBoard
  } catch (error) {
    throw new Error(error)
  }
}
const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)
    if (!board || !board.columns) {
      throw new Error('Board bot found!')
    }

    const transformBoard = cloneDeep(board)
    //Filter deleted columns
    transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)

    transformBoard.columns.forEach(column => {
      column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
    })


    delete transformBoard.cards

    return transformBoard
  } catch (error) {
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
    if(updateData.columns) delete updateData.columns

    const updatedBoard = await BoardModel.update(id, updateData)

    return updatedBoard
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const BoardService = { createNew, getFullBoard, update }