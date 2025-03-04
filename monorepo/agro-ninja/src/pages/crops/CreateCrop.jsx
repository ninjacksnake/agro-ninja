import CropForm from "./components/CropForm.jsx";

function CreateCrop(crop) {
    return ( <CropForm crop={crop} isUpdate={false} /> );
}

export default CreateCrop;