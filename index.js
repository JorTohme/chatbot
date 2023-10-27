import qrcode from 'qrcode-terminal'
import { Client } from 'whatsapp-web.js'
import { MESSAGES, infoCuotas, infoBecas, infoCarreras, infoPre, infoLicenciaturaInformatica, horariosAtencion } from './messages/messages.js'

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
    formatearBody(message.body).includes('ubicación') ||
      formatearBody(message.body).includes('ubicacion')
  ) {
    responder(message, MESSAGES.infoUbicacion)
  }

  if (
    formatearBody(message.body).includes('beca') ||
      formatearBody(message.body).includes('becas')
  ) {
    responder(message, MESSAGES.infoBecas)
  }

  //infoCarreras
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

  //infoCuotas
  if (
    formatearBody(message.body).includes('montos') ||
    formatearBody(message.body).includes('precio')
  ) {
    responder(message, infoCuotas.infoMontos)
  }

  if (
    formatearBody(message.body).includes('medios de pago')
  ) {
    responder(message, infoCuotas.infoMediosDePago)
  }

  //infoPre
  if (
    formatearBody(message.body).includes('pre') &&
    formatearBody(message.body).includes('fechas')
  ) {
    responder(message, infoPre.infoFechasPre)
  }

  if (
    formatearBody(message.body).includes('pre') &&
    formatearBody(message.body).includes('modalidad')
  ) {
    responder(message, infoPre.infoModalidadPre)
  }

  if (
    formatearBody(message.body).includes('pre') &&
    (formatearBody(message.body).includes('monto') || formatearBody(message.body).includes('montos'))
  ) {
    responder(message, infoPre.infoMontosPre)
  }

  //horariosAtencion
  if (
    formatearBody(message.body).includes('horarios') &&
    (formatearBody(message.body).includes('atencion') || formatearBody(message.body).includes('atención')) &&
    (formatearBody(message.body).includes('secretaria') || formatearBody(message.body).includes('secretaría'))
  ) {
    responder(message, horariosAtencion.horariosSecretaria)
  }

  if (
    formatearBody(message.body).includes('horarios') &&
    (formatearBody(message.body).includes('atencion') || formatearBody(message.body).includes('atención')) &&
    (formatearBody(message.body).includes('tesoreria') || formatearBody(message.body).includes('tesorería'))
  ) {
    responder(message, horariosAtencion.horariosTesoreria)
  }

  if (
    formatearBody(message.body).includes('horarios') &&
    (formatearBody(message.body).includes('atencion') || formatearBody(message.body).includes('atención')) &&
    (formatearBody(message.body).includes('nuevos ingresantes'))
  ) {
    responder(message, horariosAtencion.horariosNuevosIngresantes)
  }

  //infoBecas
  if (
    formatearBody(message.body).includes('becas') &&
    (formatearBody(message.body).includes('tipo') || formatearBody(message.body).includes('tipos'))
  ) {
    responder(message, infoBecas.tiposBeca)
  }

  if (
    formatearBody(message.body).includes('beca') &&
    (formatearBody(message.body).includes('estimulo') || formatearBody(message.body).includes('estímulo'))
  ) {
    responder(message, infoBecas.becaEstimulo)
  }

  if (
    formatearBody(message.body).includes('becas') &&
    (formatearBody(message.body).includes('asistencia económica') || formatearBody(message.body).includes('asistencia economica'))
  ) {
    responder(message, infoBecas.becaAsitenciaEconomica)
  }

  if (
    formatearBody(message.body).includes('becas') &&
    (formatearBody(message.body).includes('hijo')) &&
    (formatearBody(message.body).includes('personal'))
  ) {
    responder(message, infoBecas.becaHijoPersonal)
  }

  if (
    formatearBody(message.body).includes('becas') &&
    (formatearBody(message.body).includes('pariente') || formatearBody(message.body).includes('parientes'))
  ) {
    responder(message, infoBecas.becaParientes)
  }

  if (
    formatearBody(message.body).includes('becas') &&
    (formatearBody(message.body).includes('investigación') || formatearBody(message.body).includes('investigacion'))
  ) {
    responder(message, infoBecas.becaInvestigacion)
  }

  if (
    formatearBody(message.body).includes('becas') &&
    (formatearBody(message.body).includes('solicitud'))
  ) {
    responder(message, infoBecas.solicitudBecas)
  }

  if (
    formatearBody(message.body).includes('becas') &&
    (formatearBody(message.body).includes('beneficio')) || (formatearBody(message.body).includes('beneficios'))
  ) {
    responder(message, infoBecas.beneficiosBecas)
  }
  
  // mensaje default si no entiende
  // responder(message, 'No te entiendo un pingo')
})

client.initialize()
