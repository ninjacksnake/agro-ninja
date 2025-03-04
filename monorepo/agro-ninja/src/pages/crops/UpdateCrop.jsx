import React from 'react'
import CropForm from './components/CropForm'
import { useParams } from 'react-router-dom';

const UpdateCrop = () => {
  const id = useParams();
  const crop = JSON.parse(localStorage.getItem("SelectedCropToUpdate"));
  
  return (
    <CropForm isUpdate={true} crop={crop} id={id} />
  )
}

export default UpdateCrop