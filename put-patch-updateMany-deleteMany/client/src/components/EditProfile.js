import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function EditProfile() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let storeObj=useSelector((store)=>{
       return store;
    });

    useEffect(()=>{
        assignValues();
    },[]);

    let [image,setImage] =  useState("./images/noImage.png");

    let assignValues=()=>{
        firstNameInputRef.current.value = storeObj.loginDetails.firstName;
        lastNameInputRef.current.value = storeObj.loginDetails.lastName;
        ageInputRef.current.value = storeObj.loginDetails.age;
        emailInputRef.current.value = storeObj.loginDetails.email;
        mobileNoInputRef.current.value = storeObj.loginDetails.mobileNo;
        setImage(`http://localhost:3456/${storeObj.loginDetails.profilePic}`);
    }

    let updateUsingFormData = async () => {
      let dataToSend = new FormData();
      dataToSend.append("firstName", firstNameInputRef.current.value);
      dataToSend.append("lastName", lastNameInputRef.current.value);
      dataToSend.append("age", ageInputRef.current.value);
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);
      dataToSend.append("mobileNo", mobileNoInputRef.current.value); 
      for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
          dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
      }
  
      let reqOptions = {
          method: "PUT",
          body: dataToSend,
      };
  
      try {
          let JSONData = await fetch("http://localhost:3456/updateDetails", reqOptions);
          let JSOData = await JSONData.json();
          console.log(JSOData);
          alert(JSOData.msg);
          console.log(dataToSend);
          
          
      } catch (error) {
          console.log(error);
      }
  };
  
  return (
    <div className='edit'>
        <form>
        <label>FirstName</label>
        <input ref={firstNameInputRef}></input>
        <label>LastName</label>
        <input ref={lastNameInputRef}></input>
        <label>Age</label>
        <input ref={ageInputRef}></input>   
        <label>Email</label>    
        <input ref={emailInputRef} readOnly></input>
        <label>Password</label>
        <input ref={passwordInputRef}></input>
        <label>MobileNo</label>
        <input ref={mobileNoInputRef}></input>
        <label>ProfilePic</label>
        <input  ref={profilePicInputRef} type="file" onChange={(e)=>{
           let setImageURL = URL.createObjectURL(e.target.files[0]);
           setImage(setImageURL);
        }}></input>
        <br></br>
        <img src={image}></img>
        <div>
      <button  type="button" onClick={()=>{
           updateUsingFormData();
      }}>Update Profile</button></div>
       </form>
    </div>
  )
}

export default EditProfile
