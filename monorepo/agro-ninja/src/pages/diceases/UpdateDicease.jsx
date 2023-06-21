import React from 'react'
import DiceaseForm from './components/DiceaseForm'
import { useParams } from 'react-router-dom';

const UpdateDicease = () => {
  const id = useParams();
  const dicease = JSON.parse(localStorage.getItem("SelectedDiceaseToUpdate"));
  return (
    <DiceaseForm isUpdate={true} dicease={dicease} id={id} />
  )
}

export default UpdateDicease