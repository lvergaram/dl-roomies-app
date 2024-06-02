import express from 'express'
import roommatesRouter from './src/routes/roommate.routes.js'
import gastosRouter from './src/routes/gastos.routes.js'

const app = express()
const __dirname = import.meta.dirname

// mmiddlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/roommates', roommatesRouter)
app.use('/gastos', gastosRouter)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/views/index.html')
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => `listening on PORT ${PORT} http://localhost:${PORT}`)
