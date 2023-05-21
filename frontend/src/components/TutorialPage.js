import Wrapper from '../wrappers/Tutorial.js'  // this is for styled components
import { useState } from 'react'
import axios from 'axios';

const TutorialPage = () => {

  const sendPubKeyToMicroservice = () => {
    console.log('Sending a request with Axios to the microservice...')

    //check if RSA public key is empty
    if (!PublicKey) {
      console.log("RSA public key is empty");
      window.alert("RSA public key is empty!");
      return;
    }

    //PARTNER MICROSERVICE
    axios.post('https://cs361-microservice.herokuapp.com/', {
      publicKey: PublicKey,      
    })
    .then(function (response) {
      console.log(response.data)
      setMicroServiceAESEncrypted(response.data.encryptedKey)
      setMicroServiceAESMessage(response.data.encryptedMessage)
    })
    .catch(function (error) {
      console.log(error)
      setMicroServiceAESEncrypted("Partner's Microservice is down!")
    })


    // // MY MICROSERVICE FOR PARTNER - v1
    // axios.post('https://cs-361-microservice-iwanekm.herokuapp.com/api', {
    //   RSA_Public_Key: PublicKey, 
    //   Response_Encrypted_AES_Key: "test - decrypt this with your RSA private key",   
    //   Response_Encrypted_Message: "test - decrypt with AES key - what you decrypted with your private key",              
    // })
    // .then(function (response) {
    //   console.log(`The public key sent and echoed back in the response was: ${response.data.RSA_Public_Key}`)
    //   setMicroServiceAESEncrypted(response.data.Response_Encrypted_AES_Key)
    //   setMicroServiceAESMessage(response.data.Response_Encrypted_Message)
    // })
    // .catch(function (error) {
    //   console.log(error)
    //   setMicroServiceAESEncrypted("Partner's Microservice is down!")
    // })



        // // MY MICROSERVICE FOR PARTNER - v2
        // axios.post('https://cs-361-microservice-iwanekm.herokuapp.com/api/zip-code-from-city', {
        //   city: "San Francisco", 
        // })
        // .then(function (response) {          
        //   console.log(response.data)
        // })
        // .catch(function (error) {
        //   console.log(error)
        // })


  }

  const [PublicKey, setPublicKey] = useState('');
  const [MicroServiceAESEncrypted, setMicroServiceAESEncrypted] = useState('');
  const [MicroServiceAESMessage, setMicroServiceAESMessage] = useState('');

  return (
      <Wrapper>
        <div className="pageContainer" style={{paddingLeft:"30px"}}>
        <h1>Tutorial Page</h1>        
        <div style={{marginTop: '2%'}}></div>
        <p>This pages uses a microservice to demonstrate how to securely receive an AES key.</p>
        <p>Generate an RSA Key Pair on the RSA Page and paste the public key below.</p>
        <p>Then click the button to send the public key to the microservice.</p>
        <p>You will receive the AES key below from the microservice, which you must decrypt using your RSA Private Key. The microservice uses your public key to encrypt an AES key it creates.</p>
        <p>After decrypting the AES key, you can use this AES key to decrypt the random message that was sent to you by the microservice. </p>
        <p>To accomplish this, open the RSA and AES pages in separate tabs, and utilize the functions there with the output of this page. </p>
        <div style={{marginTop: '4%'}}></div>
        <button className="button_purple" onClick={()=> sendPubKeyToMicroservice()}>Send </button>      
        <div style={{marginTop: '2%'}}></div>  
        <p>RSA Public Key</p>
        <textarea value={PublicKey} id="rsa_public_key_field" style={{height:'150px'}} onChange={(e) => setPublicKey(e.target.value)} ></textarea>
       
        
        

        
        <div style={{marginTop: '1%'}}></div>
       
        <div className='twoColumn' style={{display:'flex', flexDirection:'row', width:'100%', alignItems: 'flex-start'}}>
        <div style={{width:'30%', marginRight: '5%'}}>
        <p>From Microservice - Encrypted AES Key - Use Private Key to Decrypt</p>        
        <textarea value={MicroServiceAESEncrypted} id="rsa_public_key_field" style={{height:'150px', width:'100%'}} onChange={(e) => setMicroServiceAESEncrypted(e.target.value)} ></textarea>
        </div>            
        <div style={{width:'30%'}}>
        <p>From Microservice - Random Message - Use Decrypted AES Key to Decrypt</p>        
        <textarea value={MicroServiceAESMessage} id="rsa_public_key_field" style={{height:'150px', width:'100%'}} onChange={(e) => setMicroServiceAESMessage(e.target.value)} ></textarea>
        </div>
        </div>  
        <p style={{marginTop: '200px'}}></p>


        </div>
      </Wrapper>
  );
}

export default TutorialPage;