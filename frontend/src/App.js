import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './component/Navbar';
import Employees from './component/Employees';
import { useState } from 'react';
import AddEmployee from './component/AddEmployee';


function App() {

  const [modal, setModal] = useState(false);

  const showModal=()=>{
    modal?setModal(false):setModal(true);
  }

  return (
    <>
      <Router>
        <div className="app">
          <Navbar showModal={showModal}/>
          <Employees/>
          <AddEmployee modal={modal} showModal={showModal}/>
        </div>
      </Router>
    </>

  );
}

export default App;
