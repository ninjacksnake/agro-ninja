import React from 'react'

import { useParams } from 'react-router-dom';
import UpdateChemicalForm from './components/UpdateChemicalForm';

const UpdateChemical = () => {
  const id = useParams();
  console.log(id)
  
  return (
     <UpdateChemicalForm  id={id.id} />
  
  )
}

export default UpdateChemical