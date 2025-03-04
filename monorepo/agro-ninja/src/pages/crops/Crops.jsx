import { react, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Crops = () => {
    const navigate = useNavigate();
   
    useEffect(() => {
        navigate("/crops/find");
    });

    return (
        <div>
            <h1>Cargando Cultivos ... </h1>
        </div>
    );
}

export default Crops;