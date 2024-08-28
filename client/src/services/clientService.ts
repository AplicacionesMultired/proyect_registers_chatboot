import axios, { AxiosResponse } from 'axios'
import { API_URL } from '../utils/contanst'
import { ClienteInfoI } from '../types/Clientes.chat.bot'

export const registerClient = async (cliente: ClienteInfoI, genero: string, username: string): Promise<AxiosResponse> => {
  const response = await axios.post(`${API_URL}/register`, { ...cliente, genero, user: username })
  return response.data.message
}
