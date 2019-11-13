const SerialPort = require('serialport')
const baudRate = 115200

class Serial {
  constructor (portId) {
    this.PORT_ID = portId
    this.port = { isOpen: false }
    this.line = ''
    this.data = ''
  }

  async connect () {
    const { vendorId, productId } = this.PORT_ID

    const { comName } = await SerialPort.list()
      .then(ports => ports.find(port => port.vendorId === vendorId && port.productId === productId))
      .catch(() => { throw new Error('error on Serialport.list') }) || {}

    if (!comName) throw new Error(`cannot find port`, this.PORT_ID)

    this.port = new SerialPort(comName, { baudRate })
    console.log('connected to', comName)

    this.port.on('data', (data) => {
      if (!data) return
      this.data += data.toString('utf-8', 0, data.length)
      if (this.data.endsWith('\n')) {
        console.log(this.data.trim())
        this.data = ''
      }
    })
  }

  async disconnect () {
    if (!this.port.isOpen) return
    await this.port.close()
    this.port = { isOpen: false }
  }

  async write (data) {
    if (!this.port.isOpen) throw new Error('no-connection yet.')

    return new Promise((resolve, reject) => {
      this.port.write(Buffer.from(data), (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }

  readline () {
    if (this.line.endsWith('\n')) {
      const line = this.line.trim()
      this.line = ''
      return line
    }
    return new Promise(
      (resolve, reject) => {
        this.port.once('readable', async () => {
          const buffer = this.port.read()
          if (buffer) this.line += buffer.toString('utf-8', 0, buffer.length)
          resolve(await this.readline())
        })
      }
    )
  }
}

module.exports = Serial