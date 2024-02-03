import React, { useState } from "react";

export default function NewPassword({ updatePass, passwordsNotSame }) {
  const [form, setForm] = useState({
    contrasena: "",
    newcontrasena: "",
  });
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.contrasena !== form.newcontrasena ||
      form.contrasena === "" ||
      form.newcontrasena === ""
    )
      passwordsNotSame();
    else
      updatePass({
        contrasena: form.contrasena,
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-3 border-l p-4"
    >
      <h3 className="text-center p-2 text-red-400 uppercase font-semibold">
        Cambio de credenciales
      </h3>
      <div className="flex flex-col">
        <label htmlFor="contrasena" className="text-sm font-bold text-red-400">
          Nueva Contraseña:
        </label>
        <input
          type="password"
          name="contrasena"
          id="contrasena"
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
          className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="newcontrasena"
          className="text-sm font-bold text-red-400"
        >
          Repetir Nueva Contraseña:
        </label>
        <input
          type="password"
          name="newcontrasena"
          id="newcontrasena"
          placeholder="Nueva Contraseña"
          value={form.newcontrasena}
          onChange={handleChange}
          className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
        />
      </div>
      <button className="bg-yellow-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-yellow-500">
        <i className="fas fa-key p-1"></i>Cambiar Contraseña
      </button>
    </form>
  );
}
