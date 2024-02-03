import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ErrorData from "../../components/ErrorData";
import { useAuthContext } from "../../context/authContext";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../api/products";
import imgDesc from "../../assets/descuentoIcon.png";
import { Toaster, toast } from "react-hot-toast";
import { createComment, getCommentsForIdProduct } from "../../api/comments";

export default function ProductCatalogue() {
  const initialForm = {
    size: "",
    color: "",
    unidades: "",
  };
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [comment, setComment] = useState({ message: "" });
  const [comments, setComments] = useState([]);

  //Auth context
  const { user } = useAuthContext();
  //Params
  const { id } = useParams();

  const getData = async () => {
    try {
      const res = await getProduct(id);
      setData(res.data);
      //console.log(res.data);
    } catch (err) {
      setError(true);
    }
  };

  const getComments = async () => {
    try {
      const res = await getCommentsForIdProduct(id);
      setComments(res.data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeComments = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getData();
    getComments();
  }, []);

  const generateNewPrice = () => {
    let desc = parseFloat(data.Precio) * parseFloat(data.Descuento / 100);
    let newPrice = parseFloat(data.Precio) - parseFloat(desc);
    return newPrice;
  };

  const handleClickImg = () => {
    window.location.href = `${data.Imagen}`;
  };

  function dateNowSQL() {
    const today = new Date();
    let day = today.getDate();
    let month = 1 + today.getMonth();
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const generateComment =async()=>{
    try{
        if(comment.message === "") return toast.error(`No puedes enviar un comentario sin contenido.`);
        const dataEndpoint = {
            comentario: comment.message,
            id_producto: parseInt(data.Id),
            id_usuario: parseInt(user.Id),
            fecha: dateNowSQL()
        }
        await createComment(dataEndpoint, user.Token);
        toast.success(`¡Comentario pubilcado!`);
        getComments();
    }
    catch(err){
        setError(true);
        console.log(err)
    }
  }

  const newComment = (e) => {
    e.preventDefault();
    try {
      if (user === null)
        return toast.error(
          `Necesitas iniciar sesión para poder hacer un comentario.`
        );
        else generateComment();
    } catch {
      setError(true);
    }
  };

  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      {error === true ? (
        <ErrorData />
      ) : (
        <article className="w-full gap-2 flex flex-col items-center mt-16">
          <article className="flex w-11/12 gap-2 justify-between border-b mt-8 p-4">
            <div>
              <img
                src={data.Imagen}
                alt={data.Id}
                onClick={handleClickImg}
                className=" w-60 h-60 object-cover rounded-md hover:scale-75 cursor-pointer transition-all"
              />
            </div>
            <div className="w-auto">
              <h3 className="text-center text-2xl p-2 uppercase font-semibold text-red-400">
                {data.Nombre}
              </h3>
              <p className="text-sm">{data.Descripcion}</p>
              {data.Descuento > 0 ? (
                <p className="p-1 font-semibold text-red-400">
                  <del>$RD {data.Precio.toFixed(2)}</del> <br />{" "}
                  <span>$RD {generateNewPrice().toFixed(2)}</span>
                </p>
              ) : (
                <p className="p-1 font-semibold text-red-400">
                  <span>$RD {parseFloat(data.Precio).toFixed(2)}</span>
                </p>
              )}
              {data.Descuento > 0 ? (
                <div className="flex items-center gap-2 p-2">
                  <img className="w-6 h-6" src={imgDesc} alt="icon-descuento" />
                  <p className="text-sm font-semibold text-slate-600">
                    {data.Descuento}%
                  </p>
                </div>
              ) : (
                ""
              )}
              <p className="text-xs text-gray-600 font-semibold">
                Unidades disponibles: {data.Unidades}
              </p>
              {data.Categoria && (
                <span
                  className="p-1 text-center mt-2 border rounded-xl block text-xs text-red-500"
                  style={{
                    width: "40%",
                  }}
                >
                  {data.Categoria}
                </span>
              )}
            </div>
            <form className="flex gap-2 flex-col">
              <h3 className="font-semibold p-2 text-red-400 uppercase">
                Datos de compra
              </h3>
              <div className="flex flex-col">
                <label
                  htmlFor="sizes"
                  className="text-sm font-bold text-red-400"
                >
                  Sizes:
                </label>
                <select
                  name="size"
                  id="sizes"
                  value={form.size}
                  onChange={handleChange}
                  className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
                >
                  <option value="">--SELECCIONE--</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="color"
                  className="text-sm font-bold text-red-400"
                >
                  Color:
                </label>
                <select
                  name="color"
                  id="color"
                  value={form.color}
                  onChange={handleChange}
                  className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
                >
                  <option value="">--SELECCIONE--</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="unidades"
                  className="text-sm font-bold text-red-400"
                >
                  Unidades:
                </label>
                <input
                  type="number"
                  name="unidades"
                  id="unidades"
                  value={form.unidades}
                  onChange={handleChange}
                  placeholder="0"
                  className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2"
                />
              </div>
              {user !== null ? (
                <button className="bg-red-500 text-sm p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-red-400">
                  <i className="fas fa-save p-1"></i>Guardar En El Carrito
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-center bg-red-500 text-sm p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-red-400"
                >
                  Debes Iniciar Sesión
                </Link>
              )}
            </form>
          </article>
          <article className="flex w-11/12 gap-2 justify-between p-4">
            <div>
              {comments.length === 0 ? (
                <h2 className="uppercase text-red-400 font-semibold text-center">
                  Este producto no tiene ningún comentario
                </h2>
              ) : (
                comments.map((el, index) => <p key={index}>{el.Id}</p>)
              )}
            </div>
            <form onSubmit={newComment} className="flex flex-col gap-2">
              <div>
                <textarea
                  type="text"
                  name="message"
                  id="comentario"
                  value={comment.message}
                  onChange={handleChangeComments}
                  placeholder="Escribe un comentario"
                  className="border rounded-sm text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2 mt-1"
                ></textarea>
              </div>
              <button
                onClick={newComment}
                className="text-center bg-red-500 text-sm p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-red-400"
              >
                Comentar
              </button>
            </form>
          </article>
        </article>
      )}
      <Toaster position="top-center" />
    </section>
  );
}
