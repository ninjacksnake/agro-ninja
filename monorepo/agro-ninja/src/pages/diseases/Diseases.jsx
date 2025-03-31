import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Diseases = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/diseases/find");
  });
  return (
    <h1>Cargando Enfermedades...</h1>
  )
}

export default Diseases