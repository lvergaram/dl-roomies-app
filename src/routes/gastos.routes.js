import { Router } from 'express'
import { getGastos, postGasto, editGasto, deleteGasto } from '../controllers/gasto.controller.js'

const router = Router()
router.get('/', getGastos)
router.post('/', postGasto)
router.put('/:id', editGasto)
router.delete('/:id', deleteGasto)

export default router
