import React from "react";
import { Route,Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "./Pages/Display";

const App=()=>{
  return(
 <Router>
   <Routes>
    <Route path="/" element={<Main/>}/>
   </Routes>
  </Router>
  )
}
export default App