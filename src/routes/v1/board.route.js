import express from 'express'
import { BoardController } from '*/controllers/board.controller'
import { BoardValidation } from '*/validations/board.validation'

const router = express.Router()


router.route('/')
  // .get((req, res) => console.log('GET líst board'))
  .post(BoardValidation.createNew, BoardController.createNew)
router.route('/:id')
  // .get((req, res) => console.log('GET líst board'))
  .get( BoardController.getFullBoard)

export const boardRoutes = router