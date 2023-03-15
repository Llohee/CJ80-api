import { BoardModel } from "../models/board.model"

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    //púsh notidication 
    // do sth
    //transform data
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew }