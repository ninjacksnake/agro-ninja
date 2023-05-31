import React from 'react'
import DeceaseForm from './components/DeceaseForm'
import { useParams } from 'react-router-dom';

const UpdateDecease = () => {
  const id = useParams();
  const decease = JSON.parse(localStorage.getItem("SelectedDeceaseToUpdate"));
  return (
    <DeceaseForm isUpdate={true} decease={decease} id={id} />
  )
}

export default UpdateDecease