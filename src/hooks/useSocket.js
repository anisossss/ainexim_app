import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { CONSTANTS } from '../constants/api'

export function useSocket(token) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (token) {
      const client = io(`${CONSTANTS.SOCKET_URL}`, {
        auth: { token },
      })

      setSocket(client)

      return () => {
        client.disconnect()
      }
    }
  }, [token])

  const joinRoom = (roomId) => {
    if (socket) {
      socket.emit('joinRoom', roomId)
    }
  }

  const sendMessage = (roomId, message) => {
    if (socket) {
      socket.emit('sendMessage', { roomId, message })
    }
  }

  return { socket, joinRoom, sendMessage }
}
