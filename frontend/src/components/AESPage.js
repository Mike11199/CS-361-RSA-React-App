import React from 'react';
import { JSEncrypt } from "jsencrypt";  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
//https://www.npmjs.com/package/node-rsa   THIS DID NOT WORK, ONLY FOR NODE AND NOT FOR REACT

import Wrapper from '../wrappers/AES.js'  // this is for styled components

const generateAESKey = () => {

}

const encryptWithAESKey = () => {
  
}


const decryptWithAESKey = () => {

 
}


const AESPage = () => {
  return (
    <Wrapper>
    <div class="pageContainer">
      <h1>AES Page</h1>
      <p>This is the AES page.</p>
      <button onClick={()=> generateAESKey()}>Generate New AES Key</button>
      <br></br>
      <p>AES Symmetric Key</p>
      <textarea id="rsa_private_key_field" style={{height:'150px'}}></textarea>
      
      <br></br>
      <br></br>
      <button onClick={()=> encryptWithAESKey()}>Encrypt Text with AES Key</button>
      <br></br>
      <br></br>
      <p>Text to Encrypt</p>      
      <textarea id="text_to_encrypt_with_pub_key"></textarea>
      <p>Text Encrypted with AES Key</p>
      <textarea id="text_encrypted_with_pub_key"></textarea>
      <br></br>
      <br></br>
      <button onClick={()=> decryptWithAESKey()}>Decrypt Text with AES Key</button>
      <br></br>
      <br></br>
      <p>Text to Decrypt</p>      
      <textarea id="text_to_decrypt_with_private_key"></textarea>
      <p>Text Decrypted with AES Key</p>
      <textarea id="decrypted_text_using_private_key"></textarea>
      <br></br>
      <br></br>
      <br></br>
    </div>
    </Wrapper>
  );
}

export default AESPage;