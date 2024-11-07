import React from "react"
import Login from "./components/Login/Login"
import "./App.css"
import {useStateValue} from "./components/ContextApi/StateProvider"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Chat from "./components/Chat/Chat"
import Sidebar from "./components/Sidebar/Sidebar"
function App() {
  const [{user}]=useStateValue();
  return (
    <div className="app">
     {!user ? 
     <Login/> :
    <div className="app_body">
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Chat/>}/>
          <Route path="/rooms/:roomId" element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
     }
    </div>
  )
}

export default App
