const PRINTER_ID = {
  vendorId: 'XXXX',
  productId: 'XXXX'
}

const Printer = require('./lib/Printer')

const main = async () => {
  const printer = new Printer(PRINTER_ID)
  await printer.connect()

  await printer.setSpeed(300)
  await printer.moveTo({ x: 100, y: 200, z: 50 })
}

main()
