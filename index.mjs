import express from 'express'
import http from 'node:http'
import process from 'node:process'
import { router as meanRouter } from './routes/mean.mjs'
import { router as medianRouter } from './routes/median.mjs'
import { router as modeRouter } from './routes/mode.mjs'
import { router as allRouter } from './routes/all.mjs'
const app = express()

app.set('view engine', 'pug')
app.use('/mean', meanRouter)
app.use('/median', medianRouter)
app.use('/mode', modeRouter)
app.use('/all', allRouter)
http.createServer(app)
  .listen(parseInt(process.env.PORT) || 3000, () => {
    console.info(`Server listening on port ${process.env.PORT || 3000}`)
})


