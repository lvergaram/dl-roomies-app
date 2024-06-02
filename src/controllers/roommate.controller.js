import { Roommate } from '../models/roommate.model.js'

export const getRoommates = async (req, res) => {
  try {
    const response = await Roommate.getAll()
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}

export const postRoommate = async (req, res) => {
  try {
    const response = await Roommate.create()
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false })
  }
}
