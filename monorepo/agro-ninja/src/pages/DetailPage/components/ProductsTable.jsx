import React from 'react';

const ProductsTable = ({ products }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;