
import './App.css';
import  { useRef, useState } from "react";

function App() {
 
  let [profile,setProfile] =useState("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSQKJEmqvzkL3_9M1v4H5VnGextOXE3tyME0ghHoZm9stG5C8yYhz_VdYV9yMjkbYcr-CflDOZb2ErQkXjQI3qoE_S-7aWOhP8hkgfgRw")

  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let genderInputRef = useRef();
  let emailIdInputRef = useRef();
  let passwordInputRef = useRef();
  let numberInputRef = useRef();
  let profilePicsInputRef =useRef();
  let sendingDataIntoDB = async ()=>{
    // let dataToSend = {
    //   firstName:firstNameInputRef.current.value,
    //   lastName:lastNameInputRef.current.value,
    //   age:ageInputRef.current.value,
    //   gender:genderInputRef.current.value,
    //   emailId:emailIdInputRef.current.value,
    //   password:passwordInputRef.current.value,
    //   number:numberInputRef.current.value,
    // }
    let dataToSend = new FormData()
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("gender",genderInputRef.current.value);
    dataToSend.append("emailId",emailIdInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("number",numberInputRef.current.value);
    dataToSend.append("profilePics",profilePicsInputRef.current.files[0]);

    // let dataToSendInJSON = JSON.stringify(dataToSend);

    // let myheaders = new Headers();
    // myheaders.append("Content-Type", "application/json");

    let reqOptions = {
      method:"POST",
      body:dataToSend,
      // headers:myheaders,
    }
    let JSONData = await fetch("http://localhost:7777/signup",reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  }
  return (
    <div className="App">
     <form>
      <legend>Signup Form</legend>

      <div>
      <label>First Name</label>
      <input type="text" ref={firstNameInputRef}></input>
     </div>

       <div>
       <label>Last Name</label>
      <input type="text" ref={lastNameInputRef}></input>
      </div>

       <div>
       <label>Age</label>
      <input type="number" ref={ageInputRef}></input>
      </div>

       <div>
       <label>Gender</label>
      <input type="text" ref={genderInputRef}></input>
      </div>

       <div>
       <label>Email ID</label>
      <input type="text" ref={emailIdInputRef}></input>
      </div>

       <div>
      <label>Password</label>
      <input type="text" ref={passwordInputRef}></input>
      </div>

      <div>
       <label>Number</label>
      <input type="number" ref={numberInputRef}></input>
      </div>

       <div>
        <label>profile pic</label>
      <input type="file"   ref={profilePicsInputRef} onChange={(eo)=>{
        let selectedImg = URL.createObjectURL(eo.target.files[0]);
        setProfile(selectedImg);
      }}></input>
      </div>
     
      <div>
        <img className='profile' src={profile} alt=''></img>
      </div>

      <div>
      <button  type='button' onClick={()=>{
            sendingDataIntoDB();
      }}>click here</button>
      </div>

     </form>
    </div>
  );
};

export default App;
