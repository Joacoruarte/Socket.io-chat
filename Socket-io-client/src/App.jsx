import { useState } from "react";
import "./App.css";
import Chat from "./Components/Chat";
import socket from "./Components/socket";

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre) {
      setRegistrado(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Socket-io project</p>
      </header>
      {!registrado && (
          <form onSubmit={registrar} className="form">
            <label>Introduce su nombre:</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <button type="submit">Ir al chat</button>
          </form>
        )}

        { 
          registrado && <Chat nombre={nombre}/>
        }
    </div>
  );
}

export default App;
