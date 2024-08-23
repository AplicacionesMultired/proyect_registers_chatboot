import axios from 'axios'
import { LOGIN_URL } from '../utils/contanst'

export const LogoutAndDeleteToken = () => {
  const token = document.cookie

  axios.post(`${LOGIN_URL}/logout`, { token })
    .then((res) => console.log(res))
    .catch(err => console.log(err))
}
