const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const http = require('http')
const path = require('path')
const fs = require('fs')

const auth = require('./routes/auth')
const user = require('./routes/user')
const admin = require('./routes/admin')
const patient = require('./routes/patient')
const provider = require('./routes/provider')
const speciality = require('./routes/specialite')
const surgery = require('./routes/surgery')
const prescription = require('./routes/prescription')
const appointment = require('./routes/appointment')
const notification = require('./routes/notification')
const conversation = require('./routes/conversation')
const message = require('./routes/message')
const radiographie = require('./routes/radiographie')
const filepatch = require('./routes/filespatch')
const metrics = require('./routes/metrics')
const payment = require('./routes/payment')
const healthmetrics = require('./routes/healtchareMetrics')
const labresult = require('./routes/labresult')
const allergy = require('./routes/allergys')
const disease = require('./routes/disease')

require('./db/connection')

const realtime = require('./settings/realtime')

const app = express()

const server = http.createServer(app)

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

app.use(cors())
app.use(express.json())
dotenv.config()

const uploadDir = path.join(__dirname, 'assets')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

app.use('/assets', express.static(path.resolve(__dirname, './assets')))

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/user/admin', admin)
app.use('/api/user/patient', patient)
app.use('/api/user/healthcareProvider', provider)
app.use('/api/specialites', speciality)
app.use('/api/surgeries', surgery)
app.use('/api/prescriptions', prescription)
app.use('/api/notifications', notification)
app.use('/api/appointment', appointment)
app.use('/api/conversation', conversation)
app.use('/api/message', message)
app.use('/api/radiographie', radiographie)
app.use('/api/files', filepatch)
app.use('/api/metrics', metrics)
app.use('/api/payment', payment)
app.use('/api/user-metrics', healthmetrics)
app.use('/api/labresult', labresult)
app.use('/api/allergys', allergy)
app.use('/api/disease', disease)

realtime(io)

server.listen(8800, () => {
  console.log('server connected')
})
