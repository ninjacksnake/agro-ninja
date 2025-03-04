import React from 'react'
import DiceaseForm2 from './components/DiceaseForm 2'
import { useParams } from 'react-router-dom';

const UpdateDicease = () => {
  const id = useParams();
  const diseases = JSON.parse(localStorage.getItem("SelecteddiceasesToUpdate"));
  // console.log('from localstorage',diseases)
  return (
    <DiceaseForm2 isUpdate={true} diseases={diseases} id={id} />
  )
}

export default UpdateDicease