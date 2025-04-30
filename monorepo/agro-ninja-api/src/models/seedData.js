const cropTypesData = [
    {
        name: "Cereales",
        description: "Cultivos cuya semilla se usa para la producción de harina y alimentos básicos.",
    
      },
      {
        name: "Leguminosos",
        description: "Plantas ricas en proteínas, utilizadas en la alimentación humana y animal.",
    
      },
      {
        name: "Hortícolas",
        description: "Hortalizas y vegetales cultivados para consumo fresco o procesado.",
    
      },
      {
        name: "Frutales",
        description: "Árboles o arbustos que producen frutos comestibles.",
    
      },
      {
        name: "Oleaginosos",
        description: "Cultivos utilizados para la extracción de aceites vegetales.",
    
      },
      {
        name: "Tuberosos",
        description: "Plantas que almacenan nutrientes en raíces o tubérculos subterráneos.",
    
      },
      {
        name: "Raices",
        description: "Plantas que almacenan nutrientes en raíces o tubérculos subterráneos.",
    
      },
      {
        name: "Industriales",
        description: "Cultivos utilizados en la producción de bienes no alimentarios.",
        examples: ["Algodón", "Caña de azúcar", "Tabaco", "Café", "Cacao", "Lúpulo"]
      },
      {
        name: "Forrajeros",
        description: "Cultivos destinados a la alimentación del ganado.",
        examples: ["Alfalfa", "Trébol", "Pasto elefante", "Sorgo forrajero", "Maíz forrajero"]
      },
      {
        name: "Energéticos",
        description: "Cultivos usados para la producción de biocombustibles.",
    
      },
      {
        name: "Medicinales y aromáticos",
        description: "Plantas utilizadas para fines terapéuticos o cosméticos.",
    
      },
      {
        name: "aromáticos",
        description: "Plantas utilizadas para fines terapéuticos o cosméticos.",
    
      }
];

const categoriesData = [
    {
        name: "Fungicidas",
        description: "Que atacan los hongos en los cultivos.",
    
      },
      {
        name: "Bactericidas",
        description: "Que atacan las bacterias en los cultivos.",
      },
      {
        name: "Viricidas",
        description: "Que atacan las virus en los cultivos.",
      },
      {
        name: "Insecticidas",
        description: "Que atacan las insectos en los cultivos.",
      },
      {
        name: "Herbicidas",
        description: "Que atacan las plantas en los cultivos.",
      },
      {
        name: "Nematicidas",
        description: "Que atacan los Nematodos en los cultivos.",
      }
];

const chemicalTypesData = [
    {
        name: "Moleculares",
        description: "Gas que se aplica a las plantas.",
      },
      {
        name: "Gas",
        description: "Que es aplicado a los cultivos.",
      },
      {
        name: "liquidos",
        description: "Que se vierte en los cultivos.",
      },
      {
        name: "solidos",
        description: "Que se ponen en los cultivos.",
      }
];

const diseaseClassification = [
    {
        name: "Plagas",
        description: "Que atacan las plantas en los cultivos.",
      },
      {
        name: "Bacterias",
        description: "Que atacan las plantas en los cultivos.",
      },
      {
        name: "Virus",
        description: "Que atacan las plantas en los cultivos.",
    
      },
      {
        name: "Insectos",
        description: "Que atacan las plantas en los cultivos.",
    
      },
      {
        name: "Nematodos",
        description: "Que atacan las plantas en los cultivos.",
      },
      {
        name: "Hongos",
        description: "Que atacan las plantas en los cultivos.",
      },
];

const defaultUser = [
    {
        firstName: "Michael",
        lastName: "Fermin",
        email: "michaelv.fermin@gmail.com",
        password: "12345678", // Consider hashing this password
        role: "admin",
        phoneNumber: "8297286407",
        isDeleted: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
];

module.exports = {
  cropTypesData,
  categoriesData,
  chemicalTypesData,
  diseaseClassification,
  defaultUser
};
