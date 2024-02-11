import React from 'react'
import RowsOrder from './RowsOrder'

export default function TableContent({data, tableHead, editOrder}) {
  return (
    <table className="bg-white rounded-md overflow-y-scroll shadow-md scale-up-center"
    style={{width: '90%'}}>
      <thead>
        <tr
          style={{
            borderBottom: "1px solid #ccc",
          }}
        >
          {tableHead.map((el, index) => (
            <th className="p-2 text-center text-red-400" key={index}>
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((el, index) => <RowsOrder key={index} noRow={index} element={el} editOrder={editOrder}/>)
        ) : (
          <tr>
            <td className="text-center" colSpan={tableHead.length}>
              ¡No hay datos existentes!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
