import React, { useState, useEffect, useRef } from "react";
import socket from "./socket";
import "../App.css";

export default function Chat({ nombre }) {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null)
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje("");
  };

  return (
    <div className="containerChat">
      <h2 className="tituloChat">Chat</h2>
      <div className="chat">
        {mensajes.map((e, i) => (
          <>
            <div key={i} className="popup">
              <div className="nombre">{e.nombre}</div>
              <div className="texto">{e.mensaje}</div>
            </div>
          </>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit}>
        <div className="containerMensaje"> 
        <textarea
            name=""
            id=""
            rows={"3"}
            value={mensaje}
            className="Mensaje"
            placeholder="Mensaje..."
            onChange={(e) => setMensaje(e.target.value)}
          />

          <button type="submit">Enviar</button>          
        </div>
  
      </form>
    </div>
  );
}
