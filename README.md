# 3D Printer Controller

Controlling 3D Printer by G-Code with Serial communication

## Setup

### Install dependencies

```sh
$ npm i
```

### Set port ID

```sh
$ node port-list.js
```

出力から1つを選び、 `Printer` のコンストラクタの第一引数にセットする

#### Sample

```js
const Printer = require('./lib/Printer')

new Printer({
  vendorId: 'XXXX',
  productId: 'XXXX'
})
```

## Usage

```js
const PRINTER_ID = {
  vendorId: 'XXXX',
  productId: 'XXXX'
}

const Printer = require('./lib/Printer')

const main = async () => {
  const printer = new Printer(PRINTER_ID)
  await printer.connect()
  await printer.initPosition()

  await printer.setSpeed(300)
  await printer.moveTo({ x: 100, y: 200, z: 50 })
}

main()
```
