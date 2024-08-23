import zod from 'zod';

const ClieFielSchema = zod.object({
  name1: zod.string({
    message: 'name1 must be a string',
    description: 'name1 is required',
  }).min(1, { message: 'name1 is required' }),
  name2: zod.string({
    message: 'name2 must be a string',
    description: 'name2 is optional',
  }).optional().nullable().default(''),
  lastname1: zod.string({
    message: 'lastname1 must be a string',
    description: 'lastname1 is required',
  }).min(1, { message: 'name1 is required' }),
  lastname2: zod.string({
    message: 'lastname2 must be a string',
    description: 'lastname2 is optional',
  }).optional().nullable().default(''),
  cedula: zod.number({
    message: 'cedula must be a number',
    description: 'cedula is required',
  }),
  telefono: zod.string({
    message: 'telefono must be a string',
    description: 'telefono is required',
  }),
  correo: zod.string({
    message: 'correo must be a string',
    description: 'correo is required',
  }),
  telwhats: zod.string({
    message: 'telwhats must be a string',
    description: 'telwhats is required',
  }),
  genero: zod.string({
    message: 'genero must be a string',
    description: 'El genero es requerido',
  }).min(1, { message: 'El genero es requerido' }),
  user: zod.string({
    message: 'User must be a string',
    description: 'User is required',
  }).min(4, { message: 'User is required' })
});

export type ClieFielType = zod.infer<typeof ClieFielSchema>

function ValidateSchemaClienteFiel (data: ClieFielType) {
  data.telefono = data.telefono.toString()
  data.telwhats = data.telwhats.toString()

  return ClieFielSchema.safeParseAsync(data)
}

export { ValidateSchemaClienteFiel}
