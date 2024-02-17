import React from "react";

export default function ItemOrder({ data, openModal }) {
  const { Estado, Fecha, Id, Monto } = data;
  const generateIcon = () => {
    if (Estado === "Entregado")
      return <i className="fas fa-truck-loading p-1 text-red-500 text-4xl"></i>;
    else if (Estado === "Solicitado")
      return <i className="fas fa-box-open p-1 text-red-500 text-4xl"></i>;
    else if (Estado === "Enviado")
      return <i className="fas fa-truck p-1 text-red-500 text-4xl"></i>;
    else if (Estado === "Cancelado")
      return <i className="fas fa-times p-1 text-red-500 text-4xl"></i>;
  };
  return (
    <div className="border-b w-auto p-4 flex gap-4" data-aos="zoom-in-up">
      <div className="flex flex-col items-center">
        {generateIcon()}
        <p className="text-sm font-semibold text-gray-600 text-center">
          Estado: <br />
          <span>{Estado}</span>
        </p>
      </div>
      <div className="flex flex-col">
        <div>
          <h3 className="text-gray-800">#{Id} ~ No. Pedido</h3>
          <p className="text-sm font-semibold text-gray-600 text-left">
            Fecha: {Fecha}
          </p>
          <p className="text-sm font-semibold text-gray-600 text-left">
            Monto: $RD {parseFloat(Monto).toFixed(2)}
          </p>
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-600 transition-all p-1 text-sm mt-4 rounded-sm hover:bg-blue-500 text-white" onClick={()=>openModal(Id)}>
            Detalle
          </button>
        </div>
      </div>
    </div>
  );
}
