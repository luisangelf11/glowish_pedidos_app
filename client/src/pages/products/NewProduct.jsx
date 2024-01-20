import React from 'react'
import MenuAdmin from "../../components/MenuAdmin";
export default function NewProduct() {
  return (
    <>
      <MenuAdmin />
      <section
        style={{ width: "86%" }}
        className="bg-gray-100 gap-2 flex flex-col justify-center items-center "
      >
        Nuevo Producto
      </section>
    </>
  )
}
