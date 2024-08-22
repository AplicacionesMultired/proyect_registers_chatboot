import { ClientesChatBot } from '../types/Clientes.chat.bot'
import { useEffect, useMemo, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'

export function useClients (option: string, company: string) {
  const [clientes, setClientes] = useState<ClientesChatBot[]>([])
  const [search, setSearch] = useState<string>('')

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

  const clientesFilter = useMemo(() => {
    return clientes.filter(cliente => {
      return cliente.nombre.toLowerCase().includes(search.toLowerCase()) || cliente.cedula.toString().includes(search)
    })
  }, [clientes, search])

  return { clientesFilter, search, setSearch }
}
