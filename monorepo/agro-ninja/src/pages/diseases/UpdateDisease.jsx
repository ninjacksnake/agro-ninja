import React from 'react';
import UpdateDiseaseForm from './components/UpdateDiseaseForm';
import { useParams } from 'react-router-dom';

const UpdateDisease = () => {
  const { id } = useParams();
  return <UpdateDiseaseForm id={id} />;
};

export default UpdateDisease;