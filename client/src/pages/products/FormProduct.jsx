/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MenuAdmin from "../../components/MenuAdmin.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { getCategorys } from "../../api/category.js";
import { useAuthContext } from "../../context/authContext.jsx";
import { createProduct, getProduct, updateProduct } from "../../api/products.js";
import '../../assets/css/animation.css'

export default function FormProduct({edit}) {
  const initialForm = {
    nombre: "",
    descripcion: "",
    unidades: "",
    precio: "",
    descuento: "",
    id_categoria: "",
  };

  //State
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [categorys, setCategorys] = useState([]);

  //Hooks
  const { user } = useAuthContext();
  const {id} = useParams();
  const navigate = useNavigate();

  const getCategorysData = async () => {
    try {
      const res = await getCategorys();
      setCategorys(res.data);
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }
  };

  const getDataEdit =async(id)=>{
    try {
      const res = await getProduct(parseInt(id));
      console.log(res.data)
      initialForm.nombre = res.data.Nombre;
      initialForm.descripcion = res.data.Descripcion;
      initialForm.unidades = res.data.Unidades;
      initialForm.descuento = res.data.Descuento;
      initialForm.precio = res.data.Precio;
      setImgUrl(res.data.Imagen);
       initialForm.id_categoria = res.data.Id_Categoria;
      
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }
  }

  useEffect(() => {
    getCategorysData();
    if(edit === true) getDataEdit(id);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImgUrl(url);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct =async()=>{
    try{
      const data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        unidades: parseInt(form.unidades),
        precio: parseFloat(form.precio),
        descuento: parseFloat(form.descuento),
        id_categoria: parseInt(form.id_categoria),
        imagen: imgUrl
      }
      const res = await createProduct(data, user.Token);
      console.log(res.data)
      setForm(initialForm);
      setImgUrl(null);
      setFile(null);
      toast.success(`¡El producto se fue creado correctamente!`);
    }
    catch(err){
      toast.error(`${err.response.data.message}`);
    }
  }

  const editProduct = async()=>{
    try{
      const data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        unidades: parseInt(form.unidades),
        precio: parseFloat(form.precio),
        descuento: parseFloat(form.descuento),
        id_categoria: parseInt(form.id_categoria),
        imagen: imgUrl
      }
      const res = await updateProduct(id, data, user.Token);
      console.log(res.data)
      setForm(initialForm);
      setImgUrl(null);
      setFile(null);
      toast.success(`¡El producto fue modificado correctamente! Redireccionando a la tabla de productos.`);
      setTimeout(()=>{
        navigate('/productos');
      }, 3000);
    }
    catch(err){
      toast.error(`${err.response.data.message}`);
    }
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(edit === false) addProduct();
    else editProduct();
  }

  const uploadFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:3000/api/v1/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setImgUrl(result.urlImage);
        toast.success(`La imagen está guardada`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <MenuAdmin />
      <section
        style={{ width: "86%" }}
        className="bg-gray-100 gap-2 flex flex-col justify-center items-center"
      >
        <form onSubmit={handleSubmit} className="scale-up-center bg-white w-2/3 shadow rounded-md flex flex-col gap-2 items-center p-2">
          <h2 className="text-xl font-semibold p-2 text-red-500 uppercase">
            {edit === false ? 'Crear producto' : `Editar producto #${id}`}
          </h2>
          <div className="flex justify-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="nombre" className="text-sm font-bold text-red-400">Nombre:</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="descripcion" className="text-sm font-bold text-red-400">Descripción:</label>
              <input
                type="text"
                name="descripcion"
                id="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="unidades" className="text-sm font-bold text-red-400">Unidades:</label>
              <input
                type="number"
                name="unidades"
                id="unidades"
                placeholder="0"
                value={form.unidades}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="descuento" className="text-sm font-bold text-red-400">Descuento:</label>
              <input
                type="number"
                name="descuento"
                id="descuento"
                value={form.descuento}
                onChange={handleChange}
                placeholder="0"
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="id_categoria" className="text-sm font-bold text-red-400">Categoría:</label>
              <select
                name="id_categoria"
                id="id_categoria"
                value={form.id_categoria}
                onChange={handleChange}
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              >
                <option value="">--SELECCIONE--</option>
                {categorys.map((el) => (
                  <option key={el.Id} value={el.Id}>
                    {el.Nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="precio" className="text-sm font-bold text-red-400">Precio:</label>
              <input
                type="number"
                name="precio"
                id="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="0"
                className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <button className="bg-blue-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-blue-500">
              <i className="fas fa-save p-1"></i>Guardar
            </button>
            <Link
              to="/productos"
              className="bg-red-600 p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-red-500"
            >
              <i className="fas fa-hand-point-left p-1"></i>Regresar
            </Link>
          </div>
        </form>
        <form
          onSubmit={uploadFile}
          className="scale-up-center bg-white w-2/3 shadow rounded-md flex flex-col gap-2 items-center p-2"
        >
          <h2 className="text-xl font-semibold p-2 text-red-500 uppercase">
            Cargar Imagen
          </h2>
          <div className="flex gap-4 items-center">
            <label htmlFor="file" className="text-sm font-bold text-red-400">Imagen:</label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
            />
            <img
              src={imgUrl}
              alt="Imagen"
              className=" w-36 h-36 object-cover p-2 border-dashed border-2 "
            />
          </div>
          <button className="bg-green-600 p-2 mt-4 cursor-pointer text-white rounded-sm transition-all hover:bg-green-500">
            <i className="p-1 fas fa-upload"></i>Subir archivo
          </button>
        </form>
        <Toaster position="top-center" />
      </section>
    </>
  );
}
