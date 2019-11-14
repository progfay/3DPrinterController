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
    await this.write('G28 X0 Y0 Z0\n')

    this.position = { x: 0, y: 0, z: 0 }
    this.hasInitialized = true
  }

  async setSpeed (speed = 500) {
    await this.write(`G0 F${speed}\n`)
  }

  async moveTo ({ x = this.position.x || 0, y = this.position.y || 0, z = this.position.z || 0 }) {
    if (!this.hasInitialized) await this.initPosition()

    await this.write(`G0 X${x} Y${y} Z${z}\n`)
    this.position = { x, y, z }
  }
}

module.exports = Printer
