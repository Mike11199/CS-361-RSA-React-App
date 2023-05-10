
import image from "../images/link_image.png"
import Wrapper from '../wrappers/Base64.js'  // this is for styled components
import B6EncodeImage from "../images/base64Encode.png"
import B6DecodeImage from "../images/base64Decode.png"

const Base64Page = () => {

  {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file */}
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file name:", file.name);
    console.log("Selected file size:", file.size);
  }

  return (
    <Wrapper>
    <div className="pageContainer">
    <h1>Base64 - External File Converter Page</h1>        
    <div className="pageContainer" style={{paddingLeft:"30px"}}>
    <p>You can use the below external links to encode/decode a file into Base 64!</p>
    <p>Once a file is in Base 64, it is possible to encrypt it using this website with AES.</p>
    <p>Try to encrypt/decrypt this image after saving it to your desktop.  This image is relatively small so that this process can work quickly.</p>
    <p>With AES, you can encrypt large files however.  RSA can only decrypt/encrypt small files (only for sending an AES key).</p>
    <img src={image} alt="link_image" style={{height: "100px", marginBottom: '20px'}} />
    <div>   <li><a href="https://base64.guru/converter/decode/file">Base 64 to File Converter (External Site)</a></li>
      <li><a href="https://base64.guru/converter/encode/file">File to Base 64 Converter (External Site)</a></li>
   
    </div>    
    {/* <p style={{marginTop:"50px"}}>test to console.log size and file name</p>
    <p></p> */}
    {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file */}
    {/* <input style={{marginBottom:"100px"}} type="file" onChange={handleFileInputChange}></input> */}

    </div>
    <p style={{marginTop: '70px'}}></p>
    <h1>How to Encode/Decode Base64 to Binary and Back with Notepad++</h1>        
    <img src={B6EncodeImage} alt="b64_encode" style={{height: "300px", marginBottom: '20px'}} />
    <p></p>
    <img src={B6DecodeImage} alt="b64_decode" style={{height: "190px", marginBottom: '20px'}} />
    </div>
    <p style={{marginBottom:"100px"}}></p>
    </Wrapper>    
  );
}

export default Base64Page;