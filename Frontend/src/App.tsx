
import Koncert from "./components/Koncert";
import ÚjKoncert from "./components/ÚjKoncert";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

  
function App() {
  const [activeSection, setActiveSection] = useState('koncert');


  return (
    <>
      <div className="container">
        <header className="py-3">
          <h1>Pilvax kávéház</h1>
          <nav>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('koncert'); }} style={{ marginRight: '10px' }}>Koncertek</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection('felvetel'); }}>Új koncert felvétele</a>
          </nav>
        </header>

        {activeSection === 'koncert' && <Koncert />}
        {activeSection === 'felvetel' && <ÚjKoncert onConcertAdded={() => {}} />}
      </div>

   
    </>
  );
}

export default App;