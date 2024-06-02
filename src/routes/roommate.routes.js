import { Router } from 'express'
import { getRoommates, postRoommate } from '../controllers/roommate.controller.js'

const router = Router()
router.get('/', getRoommates)
router.post('/', postRoommate)

export default router
