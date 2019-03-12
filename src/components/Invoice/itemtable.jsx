import React from "react";
import { add } from "./common/add";

const ProductTable = props => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Subtotal</th>
          <th scope="col" />
        </tr>
      </thead>

      <tbody>
        {props.products.map(product => (
          <tr key={props.products.indexOf(product)}>
            <td>{props.products.indexOf(product) + 1}</td>
            <td>{product.product.product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.subtotal}</td>
            <td>
              {props.onProductDelete ? (
                <button
                  onClick={() => props.onProductDelete(product)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td />
          <td />
          <td />
          <td>
            {props.products.map(product => product.subtotal).reduce(add, 0)}
          </td>
          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default ProductTable;
