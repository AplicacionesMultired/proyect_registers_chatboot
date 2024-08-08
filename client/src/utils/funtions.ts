export function separarNombre (nombre: string): { nombre1: string, nombre2: string, apellido1: string, apellido2: string } {
  const nombres = nombre.split(' ', 4)

  if (nombres.length < 2 || nombres.length > 4) {
    throw new Error('Nombre no válido')
  }

  const [nombre1, nombre2 = '', apellido1 = '', apellido2 = ''] = nombres

  return { nombre1, nombre2, apellido1, apellido2 }
}
