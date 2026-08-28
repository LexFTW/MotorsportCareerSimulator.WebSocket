import Fastify from 'fastify'
import websocket from '@fastify/websocket';

const fastify = Fastify({ logger: true })
fastify.register(websocket);

fastify.register(async function (fastify) {
  fastify.get('/*', { websocket: true }, (socket /* WebSocket */, req /* FastifyRequest */) => {
    socket.on('message', () => {
      // message.toString() === 'hi from client'
      socket.send('hi from wildcard route')
    })
  })

  fastify.get('/', { websocket: true }, (socket /* WebSocket */, req /* FastifyRequest */) => {
    socket.on('message', () => {
      // message.toString() === 'hi from client'
      socket.send('hi from server')
    })
  })
})

fastify.listen({ port: 3000, host: "0.0.0.0" })