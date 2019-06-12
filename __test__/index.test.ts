import RC4 from '../src';

describe('Testing rc4', () => {
  const encryptKey = '123';
  const rawStr = "string for encrypt";
  const rc4 = new RC4(encryptKey);
  const expectEncryptRes = '2084cdeb8b13249d4a1123ef1078d2c823f8';

  const encryptRes = rc4.encrypt(rawStr);
  const decryptRes = rc4.decrypt(expectEncryptRes);
  test('encrypt', () => {
    console.log(encryptRes);
    expect(encryptRes).toMatch(expectEncryptRes);
  });
  test('decrypt', () => {
    expect(decryptRes).toMatch(rawStr);
  });
});
