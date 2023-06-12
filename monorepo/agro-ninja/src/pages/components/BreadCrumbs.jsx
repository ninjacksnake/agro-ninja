import { Breadcrumb } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";


const translator = (word) =>  {

  const numbers = [0,1,2,3,4,5,6,7,8,9,10];
   
  const  englishToSpanish ={
    Products: 'Productos',
    Deceases: 'Enfermedades',
    Chemicals: 'Quimicos',
    Find: 'Buscar',
    Add: 'Agregar',
    Update: 'Modificar',
    Remove: 'Eliminar',
    Details: 'Detalle',
  }

  if (englishToSpanish[word] === undefined){
    return numbers[parseInt(word)];
  }
  return englishToSpanish[word]
}
const BreadCrumbss = () => {
  const location = useLocation();
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      return { title: translator(crumb.charAt(0).toUpperCase()+crumb.slice(1)) };
    });
  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={[...crumbs]}>
      {crumbs}
    </Breadcrumb>
  );
};

export default BreadCrumbss;
