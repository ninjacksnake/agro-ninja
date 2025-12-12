import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateCropForm from './components/UpdateCropForm';

const UpdateCrop = () => {
  const { id } = useParams();

  return <UpdateCropForm id={id} />;
};

export default UpdateCrop;