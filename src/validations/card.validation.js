import Joi from 'joi'
import { HttpStatusCode } from '*/ultilities/constants'


const createNew = async (req, res, next) => {
  const conditon = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(50).trim(),
  })
  try {
    await conditon.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}

export const CardValidation = { createNew }