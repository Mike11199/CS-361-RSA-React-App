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

    // PARTNER MICROSERVICE
    // axios.post('https://cs361-microservice.herokuapp.com/test', {
    //   RSA_Public_Key: 'my_pub_key_test',      
    // })
    // .then(function (response) {
    //   console.log(response.data)
    //   setMicroServiceAESEncrypted(response.data)
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })


    // MY MICROSERVICE FOR PARTNER 
    axios.post('https://cs-361-microservice-iwanekm.herokuapp.com/api', {
      RSA_Public_Key: PublicKey,      
    })
    .then(function (response) {
      console.log(response.data)
      console.log(response.data.RSA_Public_Key)
      setMicroServiceAESEncrypted(response.data.RSA_Public_Key)
    })
    .catch(function (error) {
      console.log(error)
      setMicroServiceAESEncrypted("Partner's Microservice is down!")
    })


  }

  const [PublicKey, setPublicKey] = useState('');
  const [MicroServiceAESEncrypted, setMicroServiceAESEncrypted] = useState('');
  const [MicroServiceAESMessage, setMicroServiceAESMessage] = useState('');

  return (
      <Wrapper>
        <div className="pageContainer" style={{paddingLeft:"30px"}}>
        <h1>Tutorial Page</h1>        
        <p>This pages uses a microservice to demonstrate how to securely receive an AES key.</p>
        <p>Generate an RSA Key Pair on the RSA Page and paste the public key below.</p>
        <p>Then click the button to send the public key to the microservice.</p>
        <p>You will receive the AES key below from the microservice, which you must decrypt using your RSA Private Key. The microservice uses your public key to encrypt an AES key it creates.</p>
        <p>After decrypting the AES key, you can use this AES key to decrypt the random message that was sent to you by the microservice. </p>
        <button className="button_purple" onClick={()=> sendPubKeyToMicroservice()}>Send </button>        
        <p>RSA Public Key</p>
        <textarea value={PublicKey} id="rsa_public_key_field" style={{height:'150px'}} onChange={(e) => setPublicKey(e.target.value)} ></textarea>
       
        <p>Encrypted AES Key - From Microservice - Use Private Key to Decrypt</p>
        <textarea value={MicroServiceAESEncrypted} id="rsa_public_key_field" style={{height:'150px'}} onChange={(e) => setMicroServiceAESEncrypted(e.target.value)} ></textarea>

        <p>Random Message Encrypted with AES Key - From Microservice - Use Decrypted AES Key Above to Decrypt</p>
        <textarea value={MicroServiceAESMessage} id="rsa_public_key_field" style={{height:'150px'}} onChange={(e) => setMicroServiceAESMessage(e.target.value)} ></textarea>
       
        </div>
      </Wrapper>
  );
}

export default TutorialPage;