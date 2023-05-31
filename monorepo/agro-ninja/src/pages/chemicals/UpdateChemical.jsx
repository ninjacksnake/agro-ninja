import React from 'react'
import ChemicalForm from './components/ChemicalForm'
import { useParams } from 'react-router-dom';

const UpdateChemical = () => {
  const id = useParams();
  const chemical = JSON.parse(localStorage.getItem("SelectedChemicalToUpdate"));
  return (
    <ChemicalForm isUpdate={true} chemical={chemical} id={id} />
  )
}

export default UpdateChemical