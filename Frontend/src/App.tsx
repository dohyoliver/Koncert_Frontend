
import Home from "./components/Home";
import NewConcert from "./components/NewConcert";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

  
function App() {
  const [activeSection, setActiveSection] = useState('list');


  return (
    <>
      <div className="container">
        <header className="py-3">
          <h1>Pilvax kávéház</h1>
          <nav>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('list'); }} style={{ marginRight: '10px' }}>koncertek</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('felvetel'); }}>Új koncert felvétele</a>
          </nav>
        </header>

        {activeSection === 'list' && <Home />}
        {activeSection === 'felvetel' && <NewConcert onConcertAdded={() => {}} />}
      </div>

   
    </>
  );
}

export default App;