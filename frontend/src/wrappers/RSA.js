import styled from 'styled-components'

const Wrapper = styled.aside`
    textarea {  
      width: 65%;
      height: 20vh;
    }
    .pageContainer {
      padding-left: 30px; 
    }
    .button_purple {    
      font-size: 16px;
      font-weight: bold;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      background-color: #4e2992;
      color: #FFFFFF;
      text-align: center;
      transition: background-color .4s ease;
    }
    .button_purple:hover {
      background-color: #703ccf;
    }
    .button_purple:active {
      box-shadow: 0px 0px 5px #888;
    }
    .button_red {    
      font-size: 16px;
      font-weight: bold;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      background-color: #850b0f;
      color: #FFFFFF;
      text-align: center;
      transition: background-color .4s ease;
    }
    .button_red:hover {
      background-color: #c21117;
    }
    .button_red:active {
      box-shadow: 0px 0px 5px #888;
    }
    .button_green {    
      font-size: 16px;
      font-weight: bold;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      background-color: #05542b;
      color: #FFFFFF;
      text-align: center;
      transition: background-color .4s ease;
    }
    .button_green:hover {
      background-color: #099e51;
    }
    .button_green:active {
      box-shadow: 0px 0px 5px #888;
    }




  

`
export default Wrapper