import React from 'react'
import UpdateDiseaseForm from './components/UpdateDiseaseForm'
import { useParams } from 'react-router-dom';

const UpdateDisease = () => {
  const id = useParams();
  //const diseases = JSON.parse(localStorage.getItem("SelecteddiseasesToUpdate"));
  // console.log('from localstorage',diseases)
  return (
    <UpdateDiseaseForm  id={id} />
  )
}

export default UpdateDisease