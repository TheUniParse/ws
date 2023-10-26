import { WebSocketServer } from 'ws'
import { config } from 'dotenv'

config()
const port = process.env.PORT || 8080

const wsServer = new WebSocketServer({ port })

wsServer.on('connection', wsClient => {
  // identify clients
  const newId = crypto.randomUUID()
  wsClient.id = newId
  console.log(`New client connected, ${newId}`)

  wsClient.on('message', msg => {
    const { clients } = wsServer

    const { id } = wsClient
    console.log(`received message "${msg}" from client ${id}`)

    wsClient.send(`your message received "${msg}"`)

    // broadcast to other clients
    clients.forEach(_wsClient => {
      if (_wsClient === wsClient) return
      const { id } = _wsClient
      _wsClient.send(`received message "${msg}" from client ${id}`)
    })
  })

  wsClient.on('close', () => console.log('Client disconnected'))
})