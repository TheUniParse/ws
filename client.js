import WebSocket from 'ws'
import { config } from 'dotenv'

config()
const port = process.env.PORT || 8080

const serverUrl = `ws://localhost:${port}`
const ws = new WebSocket(serverUrl)

ws.on('open', () => {
  console.log('Connected to server')

  ws.send('Hello')
})

ws.on('message', msg => console.log(`server: ${msg}`))

ws.on('close', () => console.log('Disconnected from server'))