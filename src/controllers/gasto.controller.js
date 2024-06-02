import { Gasto } from '../models/gasto.model.js'

export const getGastos = async (req, res) => {
  try {
    const response = await Gasto.getAll()
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

export const postGasto = async (req, res) => {
  try {
    const { roommate, descripcion, monto } = req.body
    const response = await Gasto.create(roommate, descripcion, monto)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

export const editGasto = async (req, res) => {
  try {
    const { id } = req.params
    const { roommate, descripcion, monto } = req.body
    const response = await Gasto.update(id, roommate, descripcion, monto)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

export const deleteGasto = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Gasto.remove(id)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}
