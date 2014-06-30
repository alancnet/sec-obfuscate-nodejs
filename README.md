sec-obfuscate-nodejs
====================
sec-obfuscate-nodejs is a library which obfuscates numbers (IDs etc...) using ciphers from [OpenSSL](https://www.openssl.org/).

## Parameters
```js
var SecObfuscate = require("sec-obfuscate-nodejs"),
secObfuscate = new SecObfuscate(password, [cipher], [blockLength]);
```
`cipher` is a name of a encrption algorithm in OpenSSL notation. Default value is **AES-256-CTR**.
`blockLength` is a length of the output block. It have to be a multiple of 8. Default value is **32**.

## Ciphers
Currently only stream cipher ([RC4](https://en.wikipedia.org/wiki/RC4)) or [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) with stream modes of operation are available:
* RC4
* AES-128-CTR
* AES-128-GCM
* AES-128-OFB
* AES-192-CTR
* AES-192-GCM
* AES-192-OFB
* AES-256-CTR
* AES-256-GCM
* AES-256-OFB

## Usage
Code below presents a simple example of how the library can be used. More examples are available in _test_ directory.
```js
var SecObfuscate = require("sec-obfuscate-nodejs"),
secObfuscate = new SecObfuscate('secretPassword'),
encryptedValue = secObfuscate.encrypt(42);
```
