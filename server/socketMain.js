const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/perfData', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
const Machine = require('./models/MAchine')

function socketMain(io, socket) {
  let macA
  // console.log('A socket connected!', socket.id)

  socket.on('clientAuth', key => {
    if (key === '5t78yuhgirekjaht32i3') {
      // valid nodeClient
      socket.join('clients')
    } else if (key === 'shjfejhfiodgskln') {
      // valid ui client
      socket.join('ui')
    } else {
      // invalid client
      socket.disconnect(true)
    }
  })

  socket.on('initPerfData', async data => {
    macA = data.macA
    const mongooseResponse = await checkAndAdd(data)
  })

  socket.on('perfData', data => {
    console.log(data)
  })
}

function checkAndAdd(data) {
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        throw err
        reject(err)
      } else if (doc === null) {
        let newMachine = new Machine(data)
        newMachine.save()
        resolve('added')
      } else {
        resolve('found')
      }
    })
  })
}

module.exports = socketMain
