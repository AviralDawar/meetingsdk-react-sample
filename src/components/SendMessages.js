import React from 'react';
import { useState } from 'react';

import './sendMessage.css';

function SendMessages(){

  const [code, setCode] = useState('');
  const [wabaID, setWabaID] = useState('');
  const [access_token, setAccessToken] = useState('');
  const [phoneNoID, setPhoneNoID] = useState('');
  const [template, setTemplate] = useState('');
  const [recepient, setRecepient] = useState('');

  const authEndpoint = 'http://localhost:3100/api/v1/facebook/getLoginUrl';
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMGNlYWM4NTEtZDIxZC00OTk5LWE2NTktN2U2MThlMjU5MmZlIiwiaWF0IjoxNzA4OTU4NzQxLCJleHAiOjE3MTE1NTA3NDF9.8D13bI4OMq1doy_dWvYs6baHhVwgHeOPH0eT68atVrU';
  const client_id = '538922714503440';
  const redirect_uri = 'https://platform.propacity.in/settings/integrations/all-integrations/facebook-forms';
  const client_secret = '61d04a4633dc51a5b530ef12cd9c1098';
  // const access_token = 'EAAHqJbj1mRABO7VDjXjeWxPBZB78jsRfDwS7u4F6Oor4KywVwxqguM0OOQNUHAHEmU8MNkZCogQPHaO0DEhQTeQHZADWXzsRtSCZBtGE4Dx4xk3b5oLcJT0AmT8EffP40cK0YVMz0B2TFETWPXycWNTAbMJykPIBzPo2UF7bzvq1Cb8Cb9Fm57ZCe';

  function getLoginUrl(e) {
    e.preventDefault();
    //in this call the API at localhost:3100/api/v1/facebook/getLoginUrl
    //put an auth token in the request, no need to put any other data
    //after getting the response, display the response.data in the login-url text box on the screen
    fetch(authEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `${authToken}`
      }
    }).then(res => res.json())
    .then(response => {
      displayLoginUrl(response)
    }).catch(error => {
      console.error(error)
    })


  }
  function displayLoginUrl(response) {
    document.getElementById('login-url').value = response.data
  }

  function sendMessage(){
    
    // this will return a response which will have data
    // make the call here
    fetch(`https://graph.facebook.com/v18.0/${phoneNoID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "messaging_product": "whatsapp",
        "to": recepient,
        "type": "template",
        "template": {
            "name": template,
            "language": {
                "code": "en_US"
            }
        }
    })
    }).then(res => res.json())
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.error(error)
    })
  }

  function getLongLiveToken(accessToken){
    fetch(`https://graph.facebook.com/v15.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${accessToken}`, {
      method: 'GET'
    }).then(res => res.json()) 
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.error(error)
    })
  }

  function getPhoneNoID(){
    // make a call to the API at
    // https://graph.facebook.com/v19.0/108626682152879/phone_numbers?access_token=EAAHqJbj1mRABO7VDjXjeWxPBZB78jsRfDwS7u4F6Oor4KywVwxqguM0OOQNUHAHEmU8MNkZCogQPHaO0DEhQTeQHZADWXzsRtSCZBtGE4Dx4xk3b5oLcJT0AmT8EffP40cK0YVMz0B2TFETWPXycWNTAbMJykPIBzPo2UF7bzvq1Cb8Cb9Fm57ZCe
    // this will return a response which will have ids_for_business
    // make the call here

    fetch(`https://graph.facebook.com/v19.0/${wabaID}/phone_numbers?access_token=${access_token}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.error(error)
    })

  }

  function inpectLongLiveToken(token){
    // make a GET call to the API
    // https://graph.facebook.com/debug_token?input_token=EAAHqJbj1mRABO7VDjXjeWxPBZB78jsRfDwS7u4F6Oor4KywVwxqguM0OOQNUHAHEmU8MNkZCogQPHaO0DEhQTeQHZADWXzsRtSCZBtGE4Dx4xk3b5oLcJT0AmT8EffP40cK0YVMz0B2TFETWPXycWNTAbMJykPIBzPo2UF7bzvq1Cb8Cb9Fm57ZCe&access_token=538922714503440|61d04a4633dc51a5b530ef12cd9c1098
    // this will return a response which will have data
    // make the call here
    fetch(`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${client_id}|${client_secret}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.error(error)
    })
  }


  function displayWABAid(){
    // make a call to the API at 
    // https://graph.facebook.com/v15.0/oauth/access_token?client_id=538922714503440&redirect_uri=https://crm.propacity.in/settings/integrations/all-integrations/facebook-forms&client_secret=61d04a4633dc51a5b530ef12cd9c1098&code=AQBbo7WFzTee2B8HEmACIuDNUo5XhDb2K6jXQJS9iTe1WGNsQxV0_2RxNHESexDa92mA7RcyKGzFARt8bcauCfQqi8pOJ_mWx7h_mqUN2g_4jGpK5_RtJRKV4x6lD3R3yeqraQwDxn6kwC0GuepJCoLHKne8HjQLoaO963y70BHO61EjKD6E4iWDCfsv25y6UFOlbCzlpiyPVUuRKnBs65aBNZ8nI7BOA66_6xp2-W4UyAYdKKXgH73Bc6v6MPQRVpqOgl9asQ5i_YlEZNHS7NWu32CdRa2LD6eif-7nsTqeEp1dWCcDEsSkpGm7oOIsdEolqGirNrl6JRhEyeUGjtyi_Q6FbeoLLg5ZFt-8x8DhL5_sHlurHLCnX6ahkbkXJ7I
    // this will return a response which will have access_token
    // make the call here
    // use state code, setCode here

    // fetch the access token using the code

    fetch(`https://graph.facebook.com/v15.0/oauth/access_token?client_id=${client_id}&redirect_uri=${redirect_uri}&client_secret=${client_secret}&code=${code}`, {
      method: 'GET'
    }).then(res => res.json())

    // fetch the long live access token using the access token
    .then(response => {
      console.log(response)
      getLongLiveToken(response.access_token)
    }

    // use the long live access token to inspect it using the inspectLongLiveToken function
    ).then(response => {
      console.log(response)
      setAccessToken(response.access_token)
      inpectLongLiveToken(response.access_token)
    }).catch(error => {
      console.error(error)
    })
  }

  function displayWABAIDFromToken(){
    // make a call to the function inpectLongLiveToken
    // this will return a response which will have data
    // make the call here
    inpectLongLiveToken(access_token)
  }




  return (
    <div className="App">
      <main>
        <h1>Whatsapp Integration Sample App</h1>
        <form onSubmit={getLoginUrl}>
          <button type="submit">Get Login URL</button>
        </form>
        <br></br>
        <div id = "text-box">
          {/* make the text box big in size */}
          <input type="text" id="login-url" value="Login URL" />
        </div>
        <br></br>
        <div id="waba_id">
            <input type="text" id="code" defaultValue="enter code here" onChange={(e) => setCode(e.target.value)} />
            <button onClick={displayWABAid}>Get WABA ID</button>
        </div>

        <div id="waba_id_from_access_token">
            <input type="text" id="access_token" defaultValue="enter access token here" onChange={(e) => setAccessToken(e.target.value)} />
            <button onClick={displayWABAIDFromToken}>Get WABA ID</button>
        </div>
            

        <div id="phone_no_id">
            {/* use state code, setCode here */}
            <input type="text" id="waba_id" defaultValue="enter WABA id here" onChange={(e) => setWabaID(e.target.value)} />
            <button onClick={getPhoneNoID}>Get Phone No ID</button>
        </div>

      <br></br>


        <div id="send-messages">
            <input type="text" id="phone_no_id" defaultValue="enter phone no id here" onChange={(e) => setPhoneNoID(e.target.value)} />
            <input type="text" id="template" defaultValue="enter template here" onChange={(e) => setTemplate(e.target.value)} />
            <input type="text" id="recepient" defaultValue="enter recepient here" onChange={(e) => setRecepient(e.target.value)} />
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </main>
    </div>
  );
}

export default SendMessages;
 