
import image from "../images/link_image.png"
import Wrapper from '../wrappers/Base64.js'  // this is for styled components

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
    <p>You can use the below external links to encrypt/decrypt a file!</p>
    <p>Try to encode/decode this image!  This image is small so that this can work.</p>
    <img src={image} alt="link_image" style={{height: "100px", marginBottom: '20px'}} />
    <div>   <li><a href="https://base64.guru/converter/decode/file">Base 64 to File Converter (External Site)</a></li>
      <li><a href="https://base64.guru/converter/encode/file">File to Base 64 Converter (External Site)</a></li>
   
    </div>

    <p style={{marginTop:"200px"}}>test to console.log size and file name</p>
    {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file */}
    <input type="file" onChange={handleFileInputChange}></input>
    </div>
    </div>
    </Wrapper>    
  );
}

export default Base64Page;