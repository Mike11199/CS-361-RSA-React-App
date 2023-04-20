import React, {useState} from 'react';
// import { JSEncrypt } from "jsencrypt";  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
//https://www.npmjs.com/package/node-rsa   THIS DID NOT WORK, ONLY FOR NODE AND NOT FOR REACT
import CryptoJS from 'crypto-js';

// https://github.com/brix/crypto-js
// https://www.npmjs.com/package/crypto-js


import Wrapper from '../wrappers/AES.js'  // this is for styled components

const generateAESKey = () => {

    // reference https://cryptojs.gitbook.io/docs/ for how to encrypt and decrypt with AES 
    // Generate a random 256-bit key
   
    // reference https://cryptojs.gitbook.io/docs/#the-hashing-input
    // The hash algorithms accept either strings or instances of CryptoJS.lib.WordArray. 
    // A WordArray object represents an array of 32-bit words. 
    // When you pass a string, it's automatically converted to a WordArray encoded as UTF-8.

    const AES_Key = CryptoJS.lib.WordArray.random(32)  //32 bytes * 8 = 256 bit key!

    // can't use utf here or crashes.. 
    // I believe it converts the bits directly to hex so that's why
    const AES_Key_String = AES_Key.toString(CryptoJS.enc.Hex) // this converts the WordArray object to a hex string
   
    console.log(AES_Key)
    console.log(AES_Key_String)
    let AES_generated_key_field = document.getElementById("aes_key_field")
    AES_generated_key_field.value = AES_Key_String

}

const encryptWithAESKey = () => {

  let AES_generated_key_field = document.getElementById("aes_key_field")
  const AES_Key_String = AES_generated_key_field.value 

  
    //check if RSA public key is empty
    if (!AES_Key_String) {
      console.log("AES key field is empty");
      window.alert("AES key field is empty!");
      return;
    }

  console.log(AES_Key_String)

  


  // const message = "test"

  let AES_text_to_encrypt_field = document.getElementById("text_to_encrypt_with_aes_key")
  const AES_text_to_encrypt = AES_text_to_encrypt_field.value 

  
    //check if RSA public key is empty
    if (!AES_text_to_encrypt) {
      console.log("AES text to encrypt field is empty");
      window.alert("AES text to encrypt field is empty!");
      return;
    }


  // TODO - fix crash that happens if deleting a char of the AES key

  // Encrypt the message with the key
  const encrypted = CryptoJS.AES.encrypt(AES_text_to_encrypt, AES_Key_String);
  console.log(encrypted)
  console.log(encrypted.toString())

  let AES_encrypted_text_field = document.getElementById("text_encrypted_with_aes_key")
  AES_encrypted_text_field.value = encrypted.toString()

}


const decryptWithAESKey = () => {

  let AES_generated_key_field = document.getElementById("aes_key_field")
  let AES_Key_String2 = AES_generated_key_field.value 

  
    //check if RSA public key is empty
    if (!AES_Key_String2) {
      console.log("AES key field is empty");
      window.alert("AES key field is empty!");
      return;
    }


  let AES_text_to_decrypt_field = document.getElementById("text_to_decrypt_with_aes_key")
  let AES_text_to_decrypt = AES_text_to_decrypt_field.value

    //check if AES text to decrypt field is empty and show alert if is
    if (!AES_text_to_decrypt) {
      console.log("AES text to decrypt field is empty");
      window.alert("AES text to decrypt field is empty!");
      return;
    }

  const decrypted = CryptoJS.AES.decrypt(AES_text_to_decrypt, AES_Key_String2);
  console.log(decrypted.toString(CryptoJS.enc.Utf8));

  let AES_decrypted_text_field = document.getElementById("decrypted_text_using_aes_key")
  AES_decrypted_text_field.value = decrypted.toString(CryptoJS.enc.Utf8)

}



const AESPage = () => {

  const [ToggleHelpAES_1, setToggleHelpAES_1] = useState('');
  const [ToggleHelpAES_2, setToggleHelpAES_2] = useState('');
  const [ToggleHelpAES_3, setToggleHelpAES_3] = useState('');



  return (
    <Wrapper>
    <div className="pageContainer">
      <h1>AES Page</h1>
      <p>This is the AES page.</p>
      <button className="button_purple" onClick={()=> generateAESKey()}>Generate New AES Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpAES_1(!ToggleHelpAES_1)}>?</button>
      {ToggleHelpAES_1 && (
        <div className='help'>
          <p> Todo</p>
        </div>
      )}
      <br></br>
      <p>AES Symmetric Key</p>
      <textarea id="aes_key_field" style={{height:'150px'}}></textarea>
      
      <br></br>
      <br></br>
      <button className="button_green" onClick={()=> encryptWithAESKey()}>Encrypt Text with AES Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpAES_2(!ToggleHelpAES_2)}>?</button>
      {ToggleHelpAES_2 && (
        <div className='help'>
          <p> Todo</p>
        </div>
      )}
      <br></br>
      <br></br>
      <p>Text to Encrypt</p>      
      <textarea id="text_to_encrypt_with_aes_key"></textarea>
      <p>Text Encrypted with AES Key</p>
      <textarea id="text_encrypted_with_aes_key"></textarea>
      <br></br>
      <br></br>
      <button className="button_red" onClick={()=> decryptWithAESKey()}>Decrypt Text with AES Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpAES_3(!ToggleHelpAES_3)}>?</button>
      {ToggleHelpAES_3 && (
        <div className='help'>
          <p> Todo</p>
        </div>
      )}
      <br></br>
      <br></br>
      <p>Text to Decrypt</p>      
      <textarea id="text_to_decrypt_with_aes_key"></textarea>
      <p>Text Decrypted with AES Key</p>
      <textarea id="decrypted_text_using_aes_key"></textarea>
      <br></br>
      <br></br>
      <br></br>
    </div>
    </Wrapper>
  );
}

export default AESPage;