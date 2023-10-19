import qrcode from 'qrcode-terminal'
import { Client } from 'whatsapp-web.js'
import { MESSAGES, infoCuotas, infoBecas, infoCarreras, infoPre, infoLicenciaturaInformatica } from './messages/messages.js'

import { formatearBody, staticDataPath, formatNumber } from './functions/helper.js'

import fs from 'fs'

const client = new Client()
const numerosUsados = []

// Inicio de la aplicación
client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Conectado')
})

client.on('auth_failure', msg => {
  console.error('Falló la autenticación', msg)
})

client.on('loading_screen', () => {
  console.log('Cargando...')
})

function responder (message, respuesta) {
  client.sendMessage(
    message.from,
    respuesta
  )
}

// Respuestas
client.on('message', message => {
  if (!numerosUsados.includes(message.from)) {
    responder(message, MESSAGES.primerMensaje)

    fs.appendFile(
      staticDataPath, formatNumber(message.from), 'utf8', (err) => {
        if (err) {
          console.error(err)
        }
      }
    )

    numerosUsados.push(message.from)
  }

  if (
    formatearBody(message.body).includes('carreras') ||
      formatearBody(message.body).includes('carrera')
  ) {
    responder(message, MESSAGES.infoCarreras)
  }

  if (
    formatearBody(message.body).includes('cuotas') ||
      formatearBody(message.body).includes('cuota')
  ) {
    responder(message, MESSAGES.infoCuotas)
  }

  if (
    formatearBody(message.body).includes('horarios') ||
      formatearBody(message.body).includes('horario')
  ) {
    responder(message, MESSAGES.infoHorarios)
  }

  if (
    formatearBody(message.body).includes('beca') ||
      formatearBody(message.body).includes('becas')
  ) {
    responder(message, MESSAGES.infoBecas)
  }

  if (
    formatearBody(message.body).includes('comercio internacional')
  ) {
    responder(message, infoCarreras.infoComercioInternacional)
  }

  if (
    formatearBody(message.body).includes('informatica')
  ) {
    responder(message, infoCarreras.infoLicenciaturaInformatica)
  }

  if (
    formatearBody(message.body).includes('marketing')
  ) {
    responder(message, infoCarreras.infoMarketing)
  }

  if (
    formatearBody(message.body).includes('relaciones institucionales')
  ) {
    responder(message, infoCarreras.infoRelacionesInstitucionales)
  }

  if (
    formatearBody(message.body).includes('telecomunicaciones')
  ) {
    responder(message, infoCarreras.infoTelecomunicaciones)
  }

  if (
    formatearBody(message.body).includes('turismo')
  ) {
    responder(message, infoCarreras.infoTurismo)
  }

  if (
    formatearBody(message.body).includes('montos')
  ) {
    responder(message, infoCarreras.infoMontos)
  }

  if (
    formatearBody(message.body).includes('medios de pago')
  ) {
    responder(message, infoCuotas.infoMediosDePago)
  }

  // mensaje default si no entiende
  // responder(message, 'No te entiendo un pingo')
})

client.initialize()
