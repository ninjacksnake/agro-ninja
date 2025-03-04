import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Chemicals = () => {
  const navigate= useNavigate();  
  useEffect(() => { 
    navigate("/chemicals/find");
  });
  return (
    <div>Cargando Componentes...</div>
  )
}

export default Chemicals