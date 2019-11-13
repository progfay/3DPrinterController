const SerialPort = require('serialport')

const main = async () => {
  const ports = await SerialPort.list()
  for (const { vendorId, productId, path } of ports) {
    console.log({ vendorId, productId, path }, '\n')
  }
}

main()
