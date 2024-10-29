import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Dashboard() {
  let storeObj = useSelector((store) => {
   return store;
  }
  
  );

  let deleteAccount = async () => {
      let reqOptions = {
          method: "DELETE"
      };
      let URL = `http://localhost:3456/deleteAccount?email=${storeObj.loginDetails.email}`;
      let JSONData = await fetch(URL, reqOptions);
      let JSOData = await JSONData.json();
      console.log(JSOData);
      alert(JSOData.msg);
  }

  

  return (
      <div>
          <TopNavigation></TopNavigation>
          <div className='dashBoard'>
          <button type="button" onClick={deleteAccount}>Delete account</button>
          <h1>Welcome to: {storeObj.loginDetails.firstName} {storeObj.loginDetails.lastName}</h1>
          <img src={`http://localhost:3456/${storeObj.loginDetails.profilePic}`} alt="Profile" />
          </div>
      </div>
  )
}


export default Dashboard
