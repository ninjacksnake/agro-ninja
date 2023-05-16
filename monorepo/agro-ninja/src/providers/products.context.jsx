import { createContext, useState } from "react";

const ProductsContext = createContext(null);

const ProductsProvider =({children})=>{
    const [products, setProducts] = useState([]);
    <ProductsContext.Provider value={[products, setProducts]} >
    {children}
    </ProductsContext.Provider>
}
 export default ProductsProvider;