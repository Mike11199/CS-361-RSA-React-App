import React, {useState} from 'react';
// import { JSEncrypt } from "jsencrypt";  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
//https://www.npmjs.com/package/node-rsa   THIS DID NOT WORK, ONLY FOR NODE AND NOT FOR REACT
import CryptoJS from 'crypto-js';
//reference https://www.npmjs.com/package/react-syntax-highlighter
// reference https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import AESImage from '../images/aes.png'

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

  const [ToggleHelpAES_1, setToggleHelpAES_1] = useState(true);
  const [ToggleHelpAES_2, setToggleHelpAES_2] = useState(true);
  const [ToggleHelpAES_3, setToggleHelpAES_3] = useState(true);

  const toggleTutorials = () => {
    setToggleHelpAES_1(!ToggleHelpAES_1)
    setToggleHelpAES_2(!ToggleHelpAES_2)
    setToggleHelpAES_3(!ToggleHelpAES_3)

  }

  return (
    <Wrapper>
    <div className="pageContainer">
      <h1>AES Page</h1>
      <p style={{width:"60%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>AES Encryption uses a symmetric cipher, where the same key is used for encryption and decryption.  The algorithms encrypts data in blocks of 16 bytes, or 4x4 matrices.  For a 256 bit key
        there are 14 rounds of encryption, where the key is XOR'd with the block, rows and columns in the block are shifted in a specific pattern, and the old key is XOR'd with the new matrix to generate
        a different key for the next round. 
      </p>
      <p style={{width:"60%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>The key space for AES encryption is 2^255 keys.  As such, a hypothetical computer that could
      try 2^26 keys a second, or 2,117.8 trillion keys in a year would take 2.73*10^61 years to brute force the encryption, or 27 trillion trillion trillion trillion trillion years.
      </p>
      <p>Reference: https://www.simplilearn.com/tutorials/cryptography-tutorial/aes-encryption</p>
      <p>Reference: https://scrambox.com/article/brute-force-aes/</p>
      <img style={{marginBottom: '3%'}} alt='aes' src={AESImage}></img>
      <p></p>
      <button className="button_orange" onClick={()=> toggleTutorials()}>Toggle Tutorials</button>
      <div style={{marginTop: '3%'}}></div>
      <button className="button_purple" onClick={()=> generateAESKey()}>Generate New AES Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpAES_1(!ToggleHelpAES_1)}>?</button>
      {ToggleHelpAES_1 && (
        <div className='help'>
          <span><strong>CLI Approach - Windows</strong></span>
          <li>If you want to generate a key manually in Windows CMD, use this command:</li>          
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
          <li>In Notepad++, select the text, then from the top menu or ribbon, select plugins, MIME tools, Base64 Encode and save.</li>
          <li>This converts the key Base64 which is human readable and can be sent via email/text/etc. </li>
          <li>To go back to bits, use plugins, MIME tools, Base64 Decode.  Keep the key in bits if you want to use it in the CLI later on.</li>
          <br></br>
          <li><strong>WARNING: </strong> &nbsp; This command-line approach won't be compatible with the web JS version.</li>
          <li>You can still use AES on your local machines, but then you will have to use this website's RSA page to transfer the Base 64 version of the key! </li>
          <li>Then convert it back to bits from Base 64 using Notepad++.</li>
          <li>This is likely due to padding or other issues in the JSEncrypt library used by this website not being compatible with openssl</li>
          <br></br>
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li>   
          <li><strong>Reference:</strong> &nbsp; https://www.openssl.org/docs/man1.1.1/man1/rand.html</li>    
          
        </div>
      )}
      <br></br>
      <p>AES Symmetric Key</p>
      <textarea id="aes_key_field" style={{height:'150px'}}></textarea>
      <div style={{marginTop: '4%'}}></div>
      <button className="button_green" onClick={()=> encryptWithAESKey()}>Encrypt Text with AES Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpAES_2(!ToggleHelpAES_2)}>?</button>
      {ToggleHelpAES_2 && (
        <div className='help'>
          <span><strong>CLI Approach - Windows</strong></span>
          <li>If you want to encrypt a file manually with the Windows CMD using AES, use this command:</li>
          <li>
          <div style={{width:"70%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            openssl aes-256-cbc -in secretfile.txt -out secretfile.txt.enc -pass file:secret.key -pbkdf2 -iter 1000000
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
      <div className='twoColumn' style={{display:'flex', flexDirection:'row', width:'100%', alignItems: 'flex-start'}}>
        <div style={{width:'30%', marginRight: '5%'}}>
        <p>Text to Encrypt</p>        
          <textarea  id="text_to_encrypt_with_aes_key" style={{height:'450px', width:'100%'}} ></textarea>
        </div>            
        <div style={{width:'30%'}}>
        <p>Text Encrypted with AES Key</p>
          <textarea id="text_encrypted_with_aes_key" style={{height:'450px', width:'100%'}} ></textarea>
        </div>
      </div>  
      <div style={{marginTop: '4%'}}></div>
      <button className="button_red" onClick={()=> decryptWithAESKey()}>Decrypt Text with AES Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpAES_3(!ToggleHelpAES_3)}>?</button>
      {ToggleHelpAES_3 && (
        <div className='help'>
          <span><strong>CLI Approach - Windows</strong></span>
          <li>If you want to decrypt a file manually with the Windows CMD using AES, use this command:</li>          
          <li>
          <div style={{width:"70%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            openssl aes-256-cbc -d -in secretfile.txt.enc -out secretfile_decrypted.txt -pass file:secret.key -pbkdf2 -iter 1000000
            </SyntaxHighlighter>
            </div>
            <li>The <strong>-pbkdf2 -iter 1000000 </strong>has to exactly match what was used to encrypt the file.</li>
            <li>You can leave out <strong>-pbkdf2 -iter 1000000</strong> for encrypt/decrypt but you will get a warning from Windows CMD that this is insecure.</li>
          </li>     
          <br></br>
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li>       
        </div>
      )}
      <br></br>
      <br></br>
      <div className='twoColumn' style={{display:'flex', flexDirection:'row', width:'100%', alignItems: 'flex-start'}}>
        <div style={{width:'30%', marginRight: '5%'}}>
        <p>Text to Decrypt</p>       
          <textarea  id="text_to_decrypt_with_aes_key" style={{height:'450px', width:'100%'}} ></textarea>
        </div>            
        <div style={{width:'30%'}}>
        <p>Text Decrypted with AES Key</p>
          <textarea id="decrypted_text_using_aes_key" style={{height:'450px', width:'100%'}} ></textarea>
        </div>
      </div>  
      <br></br>
      <br></br>
      <br></br>
    </div>
    </Wrapper>
  );
}

export default AESPage;