const Serial = require('./Serial')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class Printer extends Serial {
  constructor (portId) {
    super(portId)
    this.position = null
  }

  async connect () {
    await super.connect()
    await sleep(2000)
  }

  async initPosition () {
    await this.write('G28 X0 Y0 Z0\n')

    this.position = { x: 0, y: 0, z: 0 }
  }

  async setSpeed (speed = 500) {
    await this.write(`G0 F${speed}\n`)
  }

  async moveTo ({
    x = this.position ? this.position.x || 0 : 0,
    y = this.position ? this.position.y || 0 : 0,
    z = this.position ? this.position.z || 0 : 0
  } = this.position) {
    if (!this.position) await this.initPosition()
    const position = { x, y, z }
    await this.write(`G0 X${position.x} Y${position.y} Z${position.z}\n`)

    this.position = { x, y, z }
  }
}

module.exports = Printer
