const Serial = require('./Serial')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class Printer extends Serial {
  constructor (portId) {
    super(portId)
    this.position = { x: 0, y: 0, z: 0 }
    this.hasInitialized = false
  }

  async connect () {
    await super.connect()
    await sleep(2000)
  }

  async initPosition () {
    await this.sendGCode('G28 X0 Y0 Z0')

    this.position = { x: 0, y: 0, z: 0 }
    this.hasInitialized = true
  }

  async setSpeed (speed = 500) {
    await this.sendGCode(`G0 F${speed}`)
  }

  async moveTo ({ x = this.position.x || 0, y = this.position.y || 0, z = this.position.z || 0 }) {
    if (!this.hasInitialized) await this.initPosition()

    await this.sendGCode(`G0 X${x} Y${y} Z${z}`)
    this.position = { x, y, z }
  }

  async sendGCode (gCode) {
    await this.write(`${gCode}\n`)
  }
}

module.exports = Printer
