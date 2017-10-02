## RC4 JS

--------

### 使用
```
npm i rc4-es6 || yarn add rc4-es6

import RC4Class from 'rc4-es6';

const encryptKey = '123456';
const rc4 = new RC4Class(encryptKey);

const needEncryptData = 'abcde';
const base64Data = window.btoa(window.unescape(window.encodeURIComponent(needEncryptData)));
const encryptResult = rc4.encrypt(base64Data);

const decryptResult = rc4.decrypt(encryptResult);
const finalResult = window.decodeURIComponent(window.escape(window.atob(decryptResult)));
```

--------

### 用途
- 简单的 HTTP 的通讯加密
- 简单的本地用户密码存储
