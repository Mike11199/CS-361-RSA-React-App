import React from 'react';
import { JSEncrypt } from "jsencrypt";  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
//https://www.npmjs.com/package/node-rsa   THIS DID NOT WORK, ONLY FOR NODE AND NOT FOR REACT

const generateRSAKeys = () => {
  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
  let crypt = new JSEncrypt({default_key_size: 2048}) 
  let publicKey = crypt.getPublicKey()
  let privateKey = crypt.getPrivateKey()
  console.log(crypt)
  console.log(publicKey)
  console.log(privateKey)
}



const RSAPage = () => {
  return (
    <div>
      <h1>RSA Page</h1>
      <p>This is the RSA page.</p>
      <button onClick={()=> generateRSAKeys()}>Generate RSA Key Pair</button>
      <br></br>
      <p>RSA Private Key</p>
      <textarea></textarea>
      <p>RSA Public Key</p>
      <textarea></textarea>
      <br></br>
      <br></br>
      <button>Encrypt with RSA Public Key</button>
      <br></br>
      <br></br>
      <p>Text to Encrypt</p>      
      <textarea></textarea>
      <p>Text Encrypted with Public Key</p>
      <textarea></textarea>
      <br></br>
      <br></br>
      <button>Decrypt with RSA Public Key</button>
      <br></br>
      <br></br>
      <p>Text to Decrypt</p>      
      <textarea></textarea>
      <p>Text Decrypted with Private Key</p>
      <textarea></textarea>
    </div>
  );
}

export default RSAPage;