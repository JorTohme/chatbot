const qrcode = require('qrcode-terminal')

const { Client } = require('whatsapp-web.js')
const client = new Client()

client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

// client.on('authenticated', session => {
//   console.log('AUTHENTICATED', session)
//   // Save session object in a file
//   const authInfo = session
//   LocalAuth.save(authInfo, 'session.json')
// })

client.on('ready', () => {
  console.log('Client is ready!')
})

client.on('auth_failure', msg => {
  console.error('AUTHENTICATION FAILURE', msg)
})

client.on('loading_screen', () => {
  console.log('Loading screen...')
})

client.on('message', message => {
  if (message.body === '!ping') {
    message.reply('pong')
  }
})

client.on('message', message => {
  // example: Legajo 113203
  if (message.body.startsWith('Legajo')) {
    const legajo = message.body.split(' ')[1]

    // fetch: https://autogestion.uda.edu.ar/index_a.php POST data: legajo: 113203 ciclo: 2023 id_cert: 2394 codigo_facultad: 1
    // cookie to send:
    // ASPSESSIONIDQCASDCBC value: KLCMHLEAPKKBMFEDDMOJIFJO
    // ASPSESSIONIDSADSCCAD value: GMMDPDLCMIODGNCAGEOJOIJL

    const cookies = 'ASPSESSIONIDQCASDCBC=KLCMHLEAPKKBMFEDDMOJIFJO; ASPSESSIONIDSADSCCAD=GMMDPDLCMIODGNCAGEOJOIJL'
    fetch('https://autogestion.uda.edu.ar/index_a.php', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        legajo,
        ciclo: 2023,
        id_cert: 2394,
        codigo_facultad: 1
      })
    })
      .then(res => res.text())
      .then(res => {
        message.reply(res)
      })
  }
})

client.initialize()
