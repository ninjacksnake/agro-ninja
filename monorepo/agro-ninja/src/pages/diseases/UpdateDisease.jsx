import React from 'react'
import DiseaseForm2 from './components/DiseaseForm 2'
import { useParams } from 'react-router-dom';

const UpdateDisease = () => {
  const id = useParams();
  const diseases = JSON.parse(localStorage.getItem("SelecteddiseasesToUpdate"));
  // console.log('from localstorage',diseases)
  return (
    <DiseaseForm2 isUpdate={true} diseases={diseases} id={id} />
  )
}

export default UpdateDisease