import React, { useState, useEffect } from 'react';
import { JSEncrypt } from "jsencrypt";  // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
//https://www.npmjs.com/package/node-rsa   THIS DID NOT WORK, ONLY FOR NODE AND NOT FOR REACT
import Wrapper from '../wrappers/RSA.js'  // this is for styled components
import image from "../images/key screenshot.png"

//reference https://www.npmjs.com/package/react-syntax-highlighter
// reference https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RSAPage = () => {

  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [ToggleHelpRSA_1, setToggleHelpRSA_1] = useState(true);
  const [ToggleHelpRSA_2, setToggleHelpRSA_2] = useState(true);
  const [ToggleHelpRSA_3, setToggleHelpRSA_3] = useState(true);

  const toggleTutorials = () => {
    setToggleHelpRSA_1(!ToggleHelpRSA_1)
    setToggleHelpRSA_2(!ToggleHelpRSA_2)
    setToggleHelpRSA_3(!ToggleHelpRSA_1)

  }

  const generateRSAKeys = () => {
  
    //check to make sure user does not overwrite old keys on accident
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    // ok = true/ cancel = false
    if (privateKey || publicKey) {
      if (window.confirm("Are you sure you want to overwrite existing fields?")) {
        window.alert("Generating your keys!");
        setPrivateKey("");
        setPublicKey("");
      }
      else{
        window.alert("Canceled key pair generation!");
        return;
      }
    }

    // reference https://bartlomiejmika.com/post/2022/how-to-perform-rsa-encryption-in-javascript-and-golang/
    let crypt = new JSEncrypt({default_key_size: 4096})    
    let publicKey_generated = crypt.getPublicKey()  //can't pass directly to set state or error
    let privateKey_generated  = crypt.getPrivateKey()

    

    setPrivateKey(privateKey_generated)
    setPublicKey(publicKey_generated)

    console.log('generated from crypt')
    console.log(crypt)
    console.log(privateKey_generated)
    console.log(publicKey_generated)
  }


  const encryptWithRSAPublicKey = () => {

      //check if RSA public key is empty
      if (!publicKey) {
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
  crypt2.setPublicKey(publicKey)

  // window.alert(text_to_encrypt_with_pub_key);
  let encrypted_string_with_public_key = crypt2.encrypt(text_to_encrypt_with_pub_key)
  // console.log(encrypted_string_with_public_key)
  // window.alert(encrypted_string_with_public_key);

  // set field to encrypted text
  let encrypted_text_with_pub_key_field = document.getElementById("text_encrypted_with_pub_key")
  encrypted_text_with_pub_key_field.value = encrypted_string_with_public_key

  }


  const decryptWithPrivateKey = () => {

    // <textarea id="rsa_private_key_field" style={{height:'450px'}}></textarea>
    // <textarea id="text_to_decrypt_with_private_key"></textarea>
    // <p>Text Decrypted with Private Key</p>
    // <textarea id="decrypted_text_using_private_key"></textarea>

    let private_key_field = document.getElementById("rsa_private_key_field")
    let rsa_private_key_from_textarea = private_key_field.value  //has to be innerHTML not innerText for some reason
    // console.log(rsa_private_key_from_textarea)

    //check if RSA private key is empty
    if (!rsa_private_key_from_textarea) {
      console.log("RSA private key is empty");
      window.alert("RSA private key is empty!");
      return;
    }

    
    let text_to_decrypt_with_private_key_field = document.getElementById("text_to_decrypt_with_private_key")
    let text_to_decrypt_with_private_key= text_to_decrypt_with_private_key_field.value

        //check if text to encrypt with RSA public key is empty
        if (!text_to_decrypt_with_private_key) {
          console.log("Text to decrypt with RSA private key is empty");
          window.alert("Text to decrypt with RSA private key is empty!");
          return;
        }
      


    let crypt3 = new JSEncrypt()

    
    // reference https://www.npmjs.com/package/jsencrypt
    crypt3.setPrivateKey(rsa_private_key_from_textarea)
    let decrypted_string_with_private_key = crypt3.decrypt(text_to_decrypt_with_private_key)

    
    // set field to decrypted text
    let decrypted_text_with_private_key_field = document.getElementById("decrypted_text_using_private_key")
    decrypted_text_with_private_key_field.value = decrypted_string_with_private_key


  }


  return (
    <Wrapper>
    <div className="pageContainer">
      <h1>RSA Page</h1>
      <p>This is the RSA page.</p>
      <button className="button_orange" onClick={()=> toggleTutorials()}>Toggle Tutorials</button>
      <div style={{marginTop: '3%'}}>
      </div>  
      <button className="button_purple" onClick={()=> generateRSAKeys()}>Generate RSA Key Pair</button>
      <button className="button_gray" onClick={()=> setToggleHelpRSA_1(!ToggleHelpRSA_1)}>?</button>
      {ToggleHelpRSA_1 && (
        <div className='help'>
          <span><strong>Generating an RSA Public and Private Key</strong></span>
          <div style={{paddingLeft:"30px"}}>          
          <li> This generates a 4096 bit RSA Private Key and Public Key Pair.  You need to save these to use them in the future.</li>
          <li> The public key can be given to multiple users, while the private key must be kept safe.</li>
          <li> <strong style={{color: "red"}}>Warning! </strong>This might take up to 10 seconds due to the large key pair size!</li>
          </div>
          <br></br>
          <br></br>
          <span><strong>CLI Approach Key Generation - Windows</strong></span>
          <div style={{paddingLeft:"30px"}}>
             <li>Open the Command Prompt</li>
             <li>Make sure you are in the correct working directory or cd to it, where you want the keys to be generated to.</li>
             <li>Type the following command to generate a private key in your current directory.</li>
             <li>
              {/* Reference https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html for syntax highlighting */}
                <div style={{width:"50%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
                <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                openssl genrsa -out private_key.pem 4096
                </SyntaxHighlighter>
                </div>                
              </li>             
              <li>Type the following command to extract the public key from the private key in your current directory.</li>              
              <li>
              {/* Reference https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html for syntax highlighting */}
                <div style={{width:"50%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
                <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                openssl rsa -pubout -in private_key.pem -out public_key.pem
                </SyntaxHighlighter>
                </div>                
              </li>   
             <li>You should now have a private key in your .ssh folder named private_key.pem and a public key named test.pub</li>
             <li><img src={image} alt="link_image" style={{height: "50px"}} /></li>
             <li>ssh-keygen will not work as the key/pair won't be in a .pem format.</li>
             <br></br>
             <li><strong>Reference:</strong>&nbsp; https://www.openssl.org/docs/man3.0/man1/openssl-genpkey.html</li>
             <li><strong>Reference JS Library Documentation:</strong>&nbsp; https://travistidwell.com/jsencrypt/#</li>
          </div>
          
        </div>
      )}
      <br></br>
      <div className='twoColumn' style={{display:'flex', flexDirection:'row', width:'100%', alignItems: 'flex-start'}}>
        <div style={{width:'30%', marginRight: '5%'}}>
          <p>RSA Private Key</p>      
          <textarea value={privateKey} id="rsa_private_key_field" style={{height:'800px', width:'100%'}} onChange={(e) => setPrivateKey(e.target.value)} ></textarea>
        </div>            
        <div style={{width:'30%'}}>
          <p>RSA Public Key</p>
          <textarea value={publicKey} id="rsa_public_key_field" style={{height:'800px', width:'100%'}} onChange={(e) => setPublicKey(e.target.value)} ></textarea>
        </div>
      </div>      
      <div style={{marginTop: '5%'}}>
      </div>  
      <button className="button_green" onClick={()=> encryptWithRSAPublicKey()}>Encrypt Text with RSA Public Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpRSA_2(!ToggleHelpRSA_2)}>?</button>
      {ToggleHelpRSA_2 && (
        <div className='help'>
          
          <span><strong>General Idea</strong></span>
          
          <br></br>
          <li>RSA is usually NOT meant to send long encrypted messages. Encryption will fail for a long message size.</li>
          <li>Usually an AES key is what is encrypted by the RSA public key.</li>
          <li>This can then be decrypted ONLY by the private key holder.</li>
          <li>The public key can be given to many different individuals however.</li>
          <li><strong>Reference:</strong>&nbsp; https://en.wikipedia.org/wiki/Hybrid_cryptosystem#Example</li>
          <br></br>
          <br></br>
          <span><strong>CLI Approach Encryption - Windows</strong></span>
          
          <br></br>
          <li>Ensure you have a file called <strong>secret.key</strong> or rename that in the command. </li>
          <li>Ensure you are in the correct working directory where your public key is or cd to it.</li>
          <li>To encrypt using a CLI such as Windows CMD, use the following command:</li>          
          <li>
          <div style={{width:"90%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {`openssl rsautl -encrypt -pubin -inkey public_key.pem -in secret.key -out secret.key.enc `}
            </SyntaxHighlighter>
            </div>
          </li>          
          <li>The file <strong>secret.key</strong> is then converted to <strong>secret.key.enc</strong> where .enc is a file extension that means encrypted.</li>
          <li>Now only the private key holder can decrypt the AES key.</li>
          <br></br>
          <li><strong>Warning:</strong> You have to convert your encrypted binary text from the CLI command above to Base64 to match what this website is doing by using Notepad++:</li>
          <li>In Notepad++ open the file from the above CMD command, go to the ribbon, and select Plugins, Mime Tools, Base64 Encode while selecting all the encrypted text then save.</li>
          <li>Only when the encrypted text is in Base64 can you use your CLI output on this website in the next step.</li>
          <br></br>
          <li><strong>Warning:</strong> To use this encrypted Base64 text from the website in later steps in your CLI, you have to convert it to binary data.</li>
          <li>Copy the output of this website into a file called secret.key.enc to match later commands.</li>
          <li>In Notepad++ go to the ribbon, and select Plugins, Mime Tools, Base64 Decode while selecting all the encrypted text then save.</li>
          <li>Now the encrypted text is in binary and can be used in openssl in later steps.</li>
          <br></br>          
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li> 
          
        </div>
      )}
      <br></br>
      <br></br>
      <div className='twoColumn' style={{display:'flex', flexDirection:'row', width:'100%', alignItems: 'flex-start'}}>
        <div style={{width:'30%', marginRight: '5%'}}>
        <p>Text to Encrypt</p>      
          <textarea  id="text_to_encrypt_with_pub_key" style={{height:'450px', width:'100%'}} ></textarea>
        </div>            
        <div style={{width:'30%'}}>
        <p>Text Encrypted with Public Key</p>
          <textarea id="text_encrypted_with_pub_key" style={{height:'450px', width:'100%'}} ></textarea>
        </div>
      </div>  
      <div style={{marginTop: '5%'}}>
      </div>
      <button className="button_red" onClick={()=> decryptWithPrivateKey()}>Decrypt Text with RSA Private Key</button>
      <button className="button_gray" onClick={()=> setToggleHelpRSA_3(!ToggleHelpRSA_3)}>?</button>
      {ToggleHelpRSA_3 && (
        <div className='help'>
          <span><strong>General Idea</strong></span>
          <br></br>

          <li>Only the <strong>private key</strong> holder can decrypt a message encoded with a public key.</li>
          <li>Usually you will decrypt an AES key sent to you, encrypted by your public key.</li>
          <li>You can then use the AES key to decrypt messages sent to you, or encrypt messages with the AES key yourself.</li>
          <li>Using RSA in this way, you can securely exchange an AES key, and only use AES going forward.</li>          
          <br></br>
          <span><strong>CLI Approach Decryption - Windows</strong></span>
          <br></br>
          <li>Ensure you have a file called <strong>secret.key.enc</strong> or replace that with the actual file below in the command text. This is the file to decrypt.</li>
          <li>Ensure you are in the correct working directory where your private/public key is or cd to it.</li>
          <li>To decrypt using a CLI such as Windows CMD, use the following command:</li>
          <li>
          <div style={{width:"90%", display:"inline-block", alignItems: "center", verticalAlign: "middle"}}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {`openssl rsautl -decrypt -inkey private_key.pem -in secret.key.enc -out decrypted_secret.key`}
            </SyntaxHighlighter>
            </div>
          </li>
          <br></br>
          <li><strong>Warning:</strong> If trying to decode Base64 from this website with the CLI, you have to do the following:</li>
          <li>Copy encrypted base64 text from this website into a file, called secret.key.enc if you want to match the CLI command.</li>
          <li>In Notepad++ go to the ribbon, and select Plugins, Mime Tools, Base64 Decode while selecting all text then save.</li>
          <li>openssl expects binary not base64 or else will give mod length too large error!</li>
          <li>Then the decrypt command should work in CLI and output a new file with the decrypted text.</li>
          <br></br>
          <li><strong>Warning:</strong> If trying to decode text encrypted from the CLI on this website, you have to do the following:</li>     
          <li>Open the file created by the CLI encryption process called secret.key.enc or change the command above to reflect the actual file name. Open the file in Notepad++.</li>     
          <li>In Notepad++ go to the ribbon, and select Plugins, Mime Tools, Base64 Encode while selecting all binary text then save.</li>          
          <li>Now the binary data is in Base 64 and the Notepad++ file contents can be copied and pasted into this website to decode!</li>          
          <li><strong>Reference:</strong> &nbsp; https://www.bjornjohansen.com/encrypt-file-using-ssh-key</li>
          <br></br>
          <span><strong>Limitations</strong></span>
          <br></br>        
          <li>You cannot send an AES Key to someone unless they themselves generate an RSA Key pair.</li>
          <li>Then you will have to receive their public key, and use that to encrypt your AES key.</li>
          
        </div>
      )}
      <div className='twoColumn' style={{display:'flex', flexDirection:'row', width:'100%', alignItems: 'flex-start'}}>
        <div style={{width:'30%', marginRight: '5%'}}>
        <p>Text to Decrypt</p>       
          <textarea  id="text_to_decrypt_with_private_key" style={{height:'450px', width:'100%'}} ></textarea>
        </div>            
        <div style={{width:'30%'}}>
        <p>Text Decrypted with Private Key</p>
          <textarea id="decrypted_text_using_private_key" style={{height:'450px', width:'100%'}} ></textarea>
        </div>
      </div>  
      <br></br>
      <br></br>
      <br></br>
    </div>
    </Wrapper>
  );
}

export default RSAPage;