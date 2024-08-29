import axios, { AxiosResponse } from 'axios'
import { API_URL } from '../utils/contanst'
import { ClienteInfoI } from '../types/Clientes.chat.bot'

// TODO: MEJORA MANEJAR TRY CATCH ACA Y ENVIAR LAS RESPUESTAS YA SEAN DE ERROR O EXITO
export const registerClient = async (cliente: ClienteInfoI, genero: string, username: string): Promise<AxiosResponse> => {
  const response = await axios.post(`${API_URL}/register`, { ...cliente, genero, user: username })
  return response.data.message
}
