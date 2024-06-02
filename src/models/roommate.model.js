import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import { recalcularDeuda } from './gasto.model.js' 

const getAll = async () => {
  try {
    const data = await fs.readFile('./src/data/roommates.json', 'utf-8')
    const response = JSON.parse(data)
    return response
  } catch (error) {
    console.log(error)
  }
}

const create = async () => {
  try {
    const data = await fetch('https://randomuser.me/api/')
    const response = await data.json()
    const results = response.results[0]
    const newUserName = {
      id: uuidv4(),
      nombre: results.name.first + ' ' + results.name.last,
      debe: 0,
      recibe: 0
    }
    const roommatesData = await getAll() || []
    console.log(roommatesData)
    roommatesData.roommates.push(newUserName)
    console.log(roommatesData)
    await fs.writeFile('./src/data/roommates.json', JSON.stringify(roommatesData))
    await recalcularDeuda()
    return newUserName
  } catch (error) {
    console.log(error)
  }
}

export const Roommate = {
  getAll,
  create
}
