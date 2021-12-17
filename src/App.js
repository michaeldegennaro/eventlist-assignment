import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import EventList from './components/event-list/EventList'
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  let [authenticated, setAuthenticated] = useState(false);
  let [data, setData] = useState('fe');


  useEffect(() => {
console.log(authenticated)
}, [authenticated]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <Navbar />
        <Routes>
<Route path="*" element={<Login 
getAccData={(data) => setData(data)}
getAuthStatus={(auth) => setAuthenticated(auth)}
/>}/>
<Route path="/signup" element={<Signup />} />
{ authenticated && 
<Route path="/eventlist" element={<EventList data={data}/>} />
}
</Routes>
        </Router>
      </header>
    </div>
  );
}


export default App;
