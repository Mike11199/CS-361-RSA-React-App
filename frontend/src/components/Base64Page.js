
import image from "../images/link_image.png"

const Base64Page = () => {
  return (
    <>
    <div className="pageContainer" style={{paddingLeft:"30px"}}>
    <p>You can use the below external links to encrypt/decrypt a file!</p>
    <p>Try to encode/decode this image!  This image is small so that this can work.</p>
    <img src={image} alt="link_image" style={{height: "100px", marginBottom: '20px'}} />
    <div>
      <li><a href="https://base64.guru/converter/decode/file">Base 64 to File Converter (External Site)</a></li>
      <li><a href="https://base64.guru/converter/encode/file">File to Base 64 Converter (External Site)</a></li>
    </div>
    </div>
    </>
  );
}

export default Base64Page;