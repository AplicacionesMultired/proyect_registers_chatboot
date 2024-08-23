import { ClieFielType } from '../schemas/ClieFiel.Schema'
import { userCreated } from '../views/userCreated'
import { createTransport } from 'nodemailer'
import 'dotenv/config'

export async function sendEmail (userCreado: ClieFielType) {
  const correo = userCreado.correo
  const asistente = process.env.EMAIL_ASIS_COME as string

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    /* TODO: SE DEBE AGREGAR EL CORREO DEL CLIENTE  EN TO:  asistentecomercial@grupomultired.com.co*/
    to: correo, asistente,
    subject: 'Usuario Cliente Fiel Creado',
    html: userCreated()
  }

  await transporter.sendMail(mailOptions)

  return 'Correo enviado'

}
