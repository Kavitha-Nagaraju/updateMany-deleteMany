import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function SignUp() {
    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();

    let [image,setImage] =  useState("./images/noImage.png");

    let signupUsingFormData =async()=>{
        let dataToSend = new FormData();
        dataToSend.append("firstName",firstNameInputRef.current.value);
        dataToSend.append("lastName",lastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobileNo",mobileNoInputRef.current.value);
       
        for(let i=0;i<=profilePicInputRef.current.files.length;i++){
            dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
        }
      let  reqOptions={
            method:"POST",
            body:dataToSend,
        }
        try {
          let JSONData = await fetch("http://localhost:3456/signup",reqOptions);  
          let JSOData = await JSONData.json();
          console.log(JSOData);
          alert(JSOData.msg);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='signup'>
        <form>
        <label>FirstName</label>
        <input ref={firstNameInputRef}></input>
        <label>LastName</label>
        <input ref={lastNameInputRef}></input>
        <label>Age</label>
        <input ref={ageInputRef}></input>   
        <label>Email</label>    
        <input ref={emailInputRef}></input>
        <label>Password</label>
        <input ref={passwordInputRef}></input>
        <label>MobileNo</label>
        <input ref={mobileNoInputRef}></input>
        <label>PrifilePic</label>
        <input  ref={profilePicInputRef} type="file" onChange={(e)=>{
           let setImageURL = URL.createObjectURL(e.target.files[0]);
           setImage(setImageURL);
        }}></input>
        <br></br>
        <img src={image}></img>
        <div>
      <button  type="button" onClick={()=>{
           signupUsingFormData();
      }}>SignUp</button></div>
      <Link to="/">Login</Link>
       </form>
    </div>
  )
}

export default SignUp
