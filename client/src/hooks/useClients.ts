import { ClientesChatBot } from '../types/Clientes.chat.bot'
import { API_URL } from '../utils/contanst'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function useClients (option: string, company: string) {
  const [clientes, setClientes] = useState<ClientesChatBot[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/c-chat-bot`, { params: { company, option } })
      .then(res => {
        console.log(res.data)
        setClientes(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [option, company])

  return { clientes }
}
