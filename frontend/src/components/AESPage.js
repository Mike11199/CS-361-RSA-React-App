import React, {useState} from 'react';
// import { JSEncrypt } from "jsencrypt";  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
//https://www.npmjs.com/package/node-rsa   THIS DID NOT WORK, ONLY FOR NODE AND NOT FOR REACT
import CryptoJS from 'crypto-js';
//reference https://www.npmjs.com/package/react-syntax-highlighter
// reference https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    // const AES_Key_String = AES_Key.toString(CryptoJS.enc.Hex) // this converts the WordArray object to a hex string
    const AES_Key_String = AES_Key.toString(CryptoJS.enc.Base64) // this converts the WordArray object to base64
   
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

  console.log(AES_Key_String)
  const AES_Key_Word_Array = CryptoJS.enc.Base64.parse(AES_Key_String); // convert base64 string to WordArray



  console.log(AES_Key_Word_Array)


  // Encrypt the message with the key
  const encrypted = CryptoJS.AES.encrypt(AES_text_to_encrypt, AES_Key_String);

  
  console.log(encrypted)
  console.log('test')
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

  

  console.log(AES_Key_String2)
  let decrypted;
  try {
    decrypted = CryptoJS.AES.decrypt(AES_text_to_decrypt, AES_Key_String2);       
    console.log('decrypt')
    console.log(decrypted) 
  } catch (error) {
    console.log(error)
  }

  try {
    console.log(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.log(error)
  }
    

  let AES_decrypted_text_field = document.getElementById("decrypted_text_using_aes_key")

  try {
    AES_decrypted_text_field.value = decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.log(error)
  }
    

  

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
          <span><strong>CLI Approach - Windows</strong></span>
          <li>If you want to generate a key manually in Windows CMD, use this command:</li>
          <li><strong>WARNING: </strong> &nbsp; This command-line approach won't be compatible with the web JS version.</li>
          <li>
          <div style={{width:"60%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            openssl rand -out secret.key 32
            </SyntaxHighlighter>
            </div>
          </li>
          <li>This will generate a random AES key of 32 bytes.  32 x 8 =256 bit key.</li>
          <li>The output file will be named <strong>secret.key</strong></li>
          <li>However, this will be in bits so cannot be displayed in Notepad.  You will have to use Notepad++.</li>
          <li>In Notepad++, select the text, then from the top menu or ribbon, select plugins, MIME tools, Base64 Encode with Padding</li>
          <li>This converts the key Base64 which is human readable and can be sent via email/text/etc. </li>
          <li>To go back to bits, use plugins, MIME tools, Base64 Decode.  Keep the key in bits if you want to use it in the CLI later on.</li>
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li>       
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
          <span><strong>CLI Approach - Windows</strong></span>
          <li>If you want to encrypt a file manually with the Windows CMD using AES, use this command:</li>
          <li>
          <div style={{width:"70%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            openssl aes-256-cbc -in secretfile.txt -out secretfile.txt.enc -pass file:secret.key -pbkdf2 -iter 100000
            </SyntaxHighlighter>
            </div>
          </li>         
          <li>The <strong>-in secretfile.txt</strong> specifies the file to encrypt</li>
          <li>The <strong>-in secretfile.txt.enc</strong> specifies the destination file.  .enc just means encrypted but you can open this in Notepad++</li>
          <li>The <strong>-pbkdf2 -iter 1000000</strong> is due to the "warning deprecated key derivation" given by windows.</li>
          <li>The destination file does NOT already have to exist.</li>
          <li>The <strong>-pass file:secret.key</strong> specifies the AES key that was generated</li>
          <li>If you generated the key from the website, not the CLI, it may have to be converted from Base64 to bits using Notepad++</li>
          <br></br>
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li>       
          <li><strong>Reference:</strong> &nbsp; https://askubuntu.com/questions/1093591/how-should-i-change-encryption-according-to-warning-deprecated-key-derivat</li>       
          <li><strong>Reference:</strong> &nbsp; https://en.wikipedia.org/wiki/PBKDF2</li>       
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
          <span><strong>CLI Approach - Windows</strong></span>
          <li>If you want to decrypt a file manually with the Windows CMD using AES, use this command:</li>          
          <li>
          <div style={{width:"70%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            openssl aes-256-cbc -d -in secretfile.txt.enc -out secretfile.txt -pass file:secret.key -pbkdf2 -iter 1000000
            </SyntaxHighlighter>
            </div>
            <li>The <strong>-pbkdf2 -iter 1000000</strong>has to exactly match what was used to encrypt the file.</li>
            <li>You can leave out <strong>-pbkdf2 -iter 1000000</strong> for encrypt/decrypt but you will get a warning from Windows CMD that this is insecure.</li>
          </li>     
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li>       
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