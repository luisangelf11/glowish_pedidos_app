import React from "react";
import RowsProducts from "./RowsProducts";

export default function TableContent({ data, tableHead, deleteData }) {
  return (
    <table className="bg-white h-auto rounded-md shadow-md overflow-scroll scale-up-center "
    style={{width: '90%'}}>
      <thead>
        <tr
          style={{
            borderBottom: "1px solid #ccc",
          }}
        >
          {tableHead.map((el, index) => (
            <th className="p-2 text-left text-red-400" key={index}>
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((el, index) => <RowsProducts key={index} noRow={index} deleteP={deleteData} element={el} />)
        ) : (
          <tr>
            <td className="text-center" colSpan={tableHead.length}>
              ¡No hay datos existentes!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
