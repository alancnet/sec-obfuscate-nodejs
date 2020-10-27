sec-obfuscate
====================

_sec-obfuscate is a fork of the original [sec-obfuscate-nodejs](https://github.com/meshuga/sec-obfuscate-nodejs) last updated in 2014. There have been deprecations since then, so this library addresses those._

sec-obfuscate is a library which obfuscates numbers (IDs etc...) using ciphers from [OpenSSL](https://www.openssl.org/).


## Parameters
```js
var SecObfuscate = require("sec-obfuscate-nodejs"),
secObfuscate = new SecObfuscate(key, iv, [cipher], [blockLength]);
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
    key = '0123456789abcdef0123456789abcdef',
    iv = '0123456789abcdef'

secObfuscate = new SecObfuscate(key, iv),
encryptedValue = secObfuscate.encrypt(42),
decryptedValue = secObfuscate.decrypt(encryptedValue),
```
