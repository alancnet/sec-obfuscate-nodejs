'use strict';
var crypto = require('crypto');

var oneByte = 8,
  maxByte = 0xff;

var SecObfuscate = function(key, iv, cipherAlgorithm, blockSize) {
  var streamCipherAlgorithms = ['rc4','aes-128-ctr','aes-128-gcm','aes-128-ofb','aes-192-ctr','aes-192-gcm','aes-192-ofb','aes-256-ctr','aes-256-gcm','aes-256-ofb'];
  
  this.cipherAlgorithm = 'aes-256-ctr';
  this.blockByteSize = 4;
  
  if (!key || !iv) throw new Error('key, iv required')

  this.key = key
  this.iv = iv

  var availableCiphers = crypto.getCiphers();
  streamCipherAlgorithms  = this.updateAvailableCiphers(streamCipherAlgorithms, availableCiphers);
  if (cipherAlgorithm !== undefined) {
    if (streamCipherAlgorithms.indexOf(cipherAlgorithm) === -1) {
      throw new Error('Cipher ' + cipherAlgorithm + ' is not available');
    }
    this.cipherAlgorithm = cipherAlgorithm;
  }
  
  if (blockSize !== undefined) {
    if (blockSize % oneByte !== 0) {
      throw new Error('blockSize have to be a multiple of 8');
    }
    this.blockByteSize = blockSize / oneByte;
  }
};

SecObfuscate.prototype.updateAvailableCiphers = function(ciphers, availableCiphers) {
  var i=0;
  for (; i < ciphers.length; i++) { 
    if (availableCiphers.indexOf(ciphers[i]) === -1) {
      delete ciphers[i];
    }
  }
  
  return ciphers;
}

SecObfuscate.prototype.createNullArray = function(length) {
  return Array.apply(null, new Array(length)).map(Number.prototype.valueOf,0);
}

SecObfuscate.prototype.encrypt = function(number) {
  var cipher = crypto.createCipheriv(this.cipherAlgorithm, this.key, this.iv),
    bufferArray = [],
    byteValue, buffer, paddingLength, padding, encryptedNumber;
  
  do {
    byteValue = number & maxByte;
    bufferArray.push(byteValue);
    number = (number - byteValue) / 256 ;
  } while (number !== 0)
  
  
  paddingLength = bufferArray.length % this.blockByteSize;
  if (paddingLength !== 0) {
    padding = this.createNullArray(this.blockByteSize - paddingLength);
    bufferArray = bufferArray.concat(padding);
  }
  
  buffer = Buffer.from(bufferArray);
  encryptedNumber = cipher.update(buffer, 'binary', 'hex') + cipher.final('hex');
  
  return encryptedNumber;
}

SecObfuscate.prototype.decrypt = function(encryptedNumber) {
  var decipher = crypto.createDecipheriv(this.cipherAlgorithm, this.key, this.iv),
    byteBuffer = decipher.update(encryptedNumber, 'hex'),
    i, decryptedValue = 0;
    
    for (i = byteBuffer.length - 1; i >= 0; i--) {
      decryptedValue = (decryptedValue * 256) + byteBuffer[i];
    }

    return decryptedValue;
}

module.exports = SecObfuscate;