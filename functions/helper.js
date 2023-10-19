import path from 'node:path'

export function formatearBody (body) {
  return body.toLocaleLowerCase()
}

export const staticDataPath = path.join(process.cwd(), './staticData/numeros.txt')

export function formatNumber (string) {
  const numero = string.replace('@c.us', '')
  const numeroFormateado = numero.replace('9', ' 9 ')

  return '+' + numeroFormateado + '\n'
}
