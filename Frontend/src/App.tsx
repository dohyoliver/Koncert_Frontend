
import Koncert from "./components/Koncert";
import ÚjKoncert from "./components/ÚjKoncert";
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
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('list'); }} style={{ marginRight: '10px' }}>Koncertek</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('felvetel'); }}>Új koncert felvétele</a>
          </nav>
        </header>

        {activeSection === 'home' && <Koncert />}
        {activeSection === 'felvetel' && <ÚjKoncert onConcertAdded={() => {}} />}
      </div>

   
    </>
  );
}

export default App;