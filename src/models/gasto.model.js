import fs from 'fs/promises'
import crypto from 'crypto'
import { Roommate } from './roommate.model.js'

const gastosJsonPath = './src/data/gastos.json'
const roommatesJsonPath = './src/data/roommates.json'

const getAll = async () => {
  try {
    const data = await fs.readFile('./src/data/gastos.json', 'utf-8')
    const response = JSON.parse(data)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const recalcularDeuda = async () => {
  const gastos = await getAll()
  const totalGastos = gastos.gastos.reduce((acc, gasto) => acc + gasto.monto, 0)
 
  const roommates = await Roommate.getAll()
  const roommatesCount = roommates.roommates.length
 
  const deuda = totalGastos / roommatesCount
  
  roommates.roommates.forEach(roommate => {
    const gastosPagados = gastos.gastos.filter(gasto => gasto.roommate === roommate.nombre).reduce((acc, gasto) => acc + gasto.monto, 0)
    console.log({gastosPagados})
    const deudaNeta = deuda - gastosPagados
    if (deudaNeta > 0) {
      roommate.debe = deudaNeta
      roommate.recibe = 0
    } else {
      roommate.debe = 0
      roommate.recibe = deudaNeta
    }
  })

  await fs.writeFile(roommatesJsonPath, JSON.stringify(roommates))
}

const create = async (roommate, descripcion, monto) => {
  try {
    const gastosData = await getAll() || []
    const newGasto = {
      id: crypto.randomUUID(),
      roommate,
      descripcion,
      monto
    }
    gastosData.gastos.push(newGasto)
    await fs.writeFile('./src/data/gastos.json', JSON.stringify(gastosData))
    await recalcularDeuda()
    return newGasto
  } catch (error) {
    console.log(error)
  }
}

const update = async (id, roommate, descripcion, monto) => {
  try {
    const gastosData = await getAll() || { gastos: [] }
    gastosData.gastos = gastosData.gastos.filter(gasto => gasto.id !== id)

    const newGasto = {
      id,
      roommate,
      descripcion,
      monto
    }
    gastosData.gastos.push(newGasto)
    await fs.writeFile(gastosJsonPath, JSON.stringify(gastosData))
    await recalcularDeuda()
    return newGasto
  } catch (error) {
    console.log(error)
  }
}

const remove = async (id) => {
  try {
    const gastosData = await getAll() || { gastos: [] }
    gastosData.gastos = gastosData.gastos.filter(gasto => gasto.id !== id)
    await fs.writeFile(gastosJsonPath, JSON.stringify(gastosData))
    await recalcularDeuda()
    return {
      ok: true,
      Message: `gasto id:${id} deleted`
    }
  } catch (error) {
    console.log(error)
  }
}

export const Gasto = {
  getAll,
  create,
  update,
  remove
}
