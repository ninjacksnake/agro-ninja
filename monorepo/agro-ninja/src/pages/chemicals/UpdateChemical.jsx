import React from 'react'
import ChemicalForm from './components/ChemicalForm'
import { useParams } from 'react-router-dom';

const UpdateChemical = () => {
  const id = useParams();
  const decease = JSON.parse(localStorage.getItem("SelectedChemicalToUpdate"));
  return (
    <ChemicalForm isUpdate={true} decease={decease} id={id} />
  )
}

export default UpdateChemical