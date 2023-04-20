import image from "../images/key_crypto_image.png"

const HomePage = () => {
  return (
        <>
        <div className="pageContainer" style={{paddingLeft:"30px"}}>
        <h1>Home Page</h1>
        <p>Welcome to my app!  Please click the links to navigate.</p>
        <img src={image} alt="link_image" style={{height: "400px", marginBottom: '20px'}} />
        </div>
        </>
  );
}

export default HomePage;