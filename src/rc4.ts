/* eslint-disable no-bitwise */

import { CONST_ARR } from './constant';

/**
 * Converts the text into an array of the characters numeric Unicode values
 * @param  {String} text, the text to convert
 * @return {Array} the array of Unicode values
 */
function convert(text: string) {
  const codes: number[] = [];

  for (let i = 0, ii = text.length; i < ii; i++) {
    codes.push(text.charCodeAt(i));
  }

  return codes;
}

/**
 * Sets up the key to use with the byte stream
 * @param  {String} key, The key that you want to use
 * @return {Array}, the key stream which with be used in the byteStreamGenerator
 */
function keySetup(_key: string) {
  const K = [...CONST_ARR];
  let j = 0;
  const key = convert(_key);

  for (let i = 0, ii = K.length; i < ii; i++) {
    j = (j + K[i] + key[i % key.length]) % 256;
    [K[i], K[j]] = [K[j], K[i]];
  }

  return K;
}


/**
 * byteStreamGenerator uses ES6 generators which will be 'XOR-ed' to encrypt and decrypt
 * @param {Array} K, the array generated from the keySetup
 * @yield {Integer}, the current value which will be 'XOR-ed' to encrypt or decrypt
 */
function* byteStreamGenerator(K: number[]) {
  let i = 0;
  let j = 0;

  while (true) {
    i = (i + 1) % 256;
    j = (j + K[i]) % 256;
    [K[i], K[j]] = [K[j], K[i]];
    yield (K[(K[i] + K[j]) % 256]);
  }
}

export default class RC4Class {
  privateKey: number[];

  encryptKey: string;

  constructor(key: string) {
    if (!key) console.error('Must pass the key to constructor');
    this.privateKey = keySetup(key);
    this.encryptKey = key;
  }

  encrypt(input: any) {
    if (!input) return console.log('no input of encrypt');
    let outputText = '';
    const byteStream = byteStreamGenerator([...this.privateKey]);

    for (let i = 0, ii = input.length; i < ii; i++) {
      outputText += (`00${(input.charCodeAt(i) ^ byteStream.next().value).toString(16)}`).substr(-2);
    }

    return outputText;
  }

  decrypt(_input: string) {
    if (!_input) return console.log('no input of decrypt');
    let outputText = '';
    const byteStream = byteStreamGenerator([...this.privateKey]);

    const input = _input.match(/[a-z0-9]{2}/gi);

    for (let i = 0, ii = input.length; i < ii; i++) {
      outputText += String.fromCharCode((parseInt(input[i], 16) ^ byteStream.next().value));
    }

    return outputText;
  }
}
