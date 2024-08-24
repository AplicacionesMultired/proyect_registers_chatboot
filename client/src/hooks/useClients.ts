import { ClientesChatBot } from '../types/Clientes.chat.bot'
import { useEffect, useMemo, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'

export function useClients (option: string, company: string) {
  const [clientes, setClientes] = useState<ClientesChatBot[]>([])
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data } = await axios.get(`${API_URL}/c-chat-bot`, { params: { company, option } })
        console.log(data)
        setClientes(data)
      } catch (error) {
        setError('Ocurrio un error al cargar los clientes')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [option, company])

  const clientesFilter = useMemo(() => {
    return clientes.filter(cliente => {
      return cliente.nombre.toLowerCase().includes(search.toLowerCase()) || cliente.cedula.toString().includes(search)
    })
  }, [clientes, search])

  return { clientesFilter, search, setSearch, loading, error }
}
