import React from "react";
import { add } from "./common/add";

const ItemTable = props => {
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
        {props.items.map(item => (
          <tr key={props.items.indexOf(item)}>
            <td>{props.items.indexOf(item) + 1}</td>
            <td>{item.item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.subtotal}</td>
            <td>
              <button
                onClick={() => props.onItemDelete(item)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td />
          <td />
          <td />
          <td>{props.items.map(item => item.subtotal).reduce(add, 0)}</td>
          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default ItemTable;
