'use client'
import Image from 'next/image'
import  './app.css';
import { useState } from 'react'
import CryptoJS from 'crypto-js';

const SECRET_PASS = "XkhZG4fW2t2W"

export default function Home() {
  const [Screen, setScreen] = useState("encrypt");
  const [errorMessage, setErrorMessage] = useState("Please Enter Some Text");
  const[text, setText] = useState("")
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const encryptData = () => {
    try{
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        SECRET_PASS
      ).toString();
      setEncryptedData(data);
      setErrorMessage("");
    } catch(error){
      setErrorMessage("Encryption Failed. Please Check Your Input");
    }
  };

  const decryptData = () => {
    try{
      const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecryptedData(data)
      setErrorMessage("");
    }
    catch (error){
      setErrorMessage("Decryption Failed. Please Check Your Input ")
    }
  }

  const handleClick = () => {
    if (!text){
      setErrorMessage("Please enter some text");
    return;
    }

    if (Screen === "encrypt"){
      encryptData();
    } else {
      decryptData();
    }
  }
  const  switchButton = (type) => {
    setScreen(type);
    setText("");
    setEncryptedData("");
    setDecryptedData("");
    setErrorMessage("");
  }
  
  
  return (
    <main className={'main'}>
      <div>
      <button
      className={`btnleft ${Screen === "encrypt" ? "active" : "" }`}
      onClick={() => {switchButton("encrypt")}}
      >
        Encrypt
      </button>
      <button
      className={`btnright ${Screen === "decrypt" ? "active" : ""}`}
      onClick={() => {switchButton("decrypt")}}
      >
        Decrypt
      </button>
      </div>
      
      <div className='card'>
        <textarea 
        value={text}
        onChange={({target }) => setText(target.value)}
        placeholder={Screen === "encrypt" ? 'Enter Your Text' : 'Enter encrypted data'}
        />

      {errorMessage && <div className="error">{errorMessage}</div>}
        <button
        className= {`btnsubmit ${
          Screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
        }`}
        onClick={handleClick}
        >
          {Screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>
      {encryptedData || decryptedData ? (
        <div className="content">
          <label>{Screen === "encrypt" ? "ENCRYPTED" : "Decrypted"} DATA </label>
            <p>{Screen === "encrypt" ? encryptedData : decryptedData}</p>
          </div>
      ): null}
    </main>
  )
}
