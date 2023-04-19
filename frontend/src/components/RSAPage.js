import React from 'react';
import { JSEncrypt } from "jsencrypt";  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
//https://www.npmjs.com/package/node-rsa   THIS DID NOT WORK, ONLY FOR NODE AND NOT FOR REACT

import Wrapper from '../wrappers/RSA.js'  // this is for styled components

const generateRSAKeys = () => {
  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
  let crypt = new JSEncrypt({default_key_size: 2048}) 
  let publicKey = crypt.getPublicKey()
  let privateKey = crypt.getPrivateKey()
  // let publicKey_B64 = crypt.getPublicKeyB64()
  // let privateKey_B64 = crypt.getPrivateKeyB64()
  console.log(crypt)
  console.log(publicKey)
  console.log(privateKey)
  const private_key_field = document.getElementById("rsa_private_key_field")
  const public_key_field = document.getElementById("rsa_public_key_field")
  private_key_field.value = privateKey
  public_key_field.value = publicKey
  // console.log(publicKey_B64)
  // console.log(privateKey_B64)
}

const encryptWithRSAPublicKey = () => {
  let public_key_field = document.getElementById("rsa_public_key_field")
  let rsa_public_key_from_textarea = public_key_field.value  //has to be innerHTML not innerText for some reason
  console.log(rsa_public_key_from_textarea)

    //check if RSA public key is empty
    if (!rsa_public_key_from_textarea) {
      console.log("RSA public key is empty");
      window.alert("RSA public key is empty!");
      return;
    }
  
  let text_to_encrypt_with_pub_key_field = document.getElementById("text_to_encrypt_with_pub_key")
  let text_to_encrypt_with_pub_key= text_to_encrypt_with_pub_key_field.value

      //check if text to encrypt with RSA public key is empty
      if (!text_to_encrypt_with_pub_key) {
        console.log("Text to encrypt with RSA public key is empty");
        window.alert("Text to encrypt with RSA public key is empty!");
        return;
      }
    

  let crypt2 = new JSEncrypt() 

  // reference https://www.npmjs.com/package/jsencrypt
  crypt2.setPublicKey(rsa_public_key_from_textarea)

  // window.alert(text_to_encrypt_with_pub_key);
  let encrypted_string_with_public_key = crypt2.encrypt(text_to_encrypt_with_pub_key)
  // console.log(encrypted_string_with_public_key)
  // window.alert(encrypted_string_with_public_key);

  // set field to encrypted text
  let encrypted_text_with_pub_key_field = document.getElementById("text_encrypted_with_pub_key")
  encrypted_text_with_pub_key_field.value = encrypted_string_with_public_key

}



const RSAPage = () => {
  return (
    <Wrapper>
    <div>
      <h1>RSA Page</h1>
      <p>This is the RSA page.</p>
      <button onClick={()=> generateRSAKeys()}>Generate RSA Key Pair</button>
      <br></br>
      <p>RSA Private Key</p>
      <textarea id="rsa_private_key_field" style={{height:'450px'}}></textarea>
      <p>RSA Public Key</p>
      <textarea id="rsa_public_key_field" style={{height:'150px'}}></textarea>
      <br></br>
      <br></br>
      <button onClick={()=> encryptWithRSAPublicKey()}>Encrypt with RSA Public Key</button>
      <br></br>
      <br></br>
      <p>Text to Encrypt</p>      
      <textarea id="text_to_encrypt_with_pub_key"></textarea>
      <p>Text Encrypted with Public Key</p>
      <textarea id="text_encrypted_with_pub_key"></textarea>
      <br></br>
      <br></br>
      <button>Decrypt with RSA Public Key</button>
      <br></br>
      <br></br>
      <p>Text to Decrypt</p>      
      <textarea></textarea>
      <p>Text Decrypted with Private Key</p>
      <textarea></textarea>
      <br></br>
      <br></br>
      <br></br>
    </div>
    </Wrapper>
  );
}

export default RSAPage;