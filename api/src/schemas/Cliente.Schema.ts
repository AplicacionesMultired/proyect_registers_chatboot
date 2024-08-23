import zod from 'zod';


const ClienteSchema = zod.object({
  cedula: zod.number({
    message: 'Cedula must be a number',
    description: 'Cedula is required',
  }),
  nombre: zod.string({
    message: 'Nombre must be a string',
    description: 'Nombre is required',
  }).min(5, { message: 'Nombres is required' }),
  telefono: zod.string({
    message: 'Telefono must be a string',
    description: 'Telefono is required',
  }),
  correo: zod.string({
    message: 'Correo must be a string',
    description: 'Correo is required',
  }),
  telwhats: zod.string({
    message: 'Telwhats must be a string',
    description: 'Telwhats is required',
  })
})

export type ClienteType = zod.infer<typeof ClienteSchema>

export function validateCliente (client: ClienteType){
  return ClienteSchema.safeParseAsync(client)
}

