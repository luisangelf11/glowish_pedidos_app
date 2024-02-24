import React, { useEffect, useState } from "react";
import MenuUser from "../../components/MenuUser";
import ErrorData from "../../components/ErrorData";
import { useAuthContext } from "../../context/authContext";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../api/products";
import imgDesc from "../../assets/descuentoIcon.png";
import { Toaster, toast } from "react-hot-toast";
import { createComment, getCommentsForIdProduct } from "../../api/comments";
import "../../assets/css/animation.css";
import CardComment from "../../components/CardComment";
import { deleteComment } from "../../api/comments";
import Rating from "react-rating";
import {
  createRanking,
  updateRanking,
  validateRanking,
} from "../../api/ranking";
import { getSizeDisponibles } from "../../api/sizes";
import { getColorsDisponibles } from "../../api/colors";
import { createCart } from "../../api/cart";
import { useToken } from "../../hooks/useToken";
import { useTimeNowSQL } from "../../hooks/useTimeNowSQL";
import MyAlert from "../../components/MyAlert";

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
  const [rank, setRank] = useState(0);
  const [rankingState, setRankingState] = useState(false);
  const [dataRanking, setDataRanking] = useState({});
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [myAlert, setMyAlert] = useState(false);

  //Functiosn alerts
  const closeAlert =()=>{
    setMyAlert(false);
    setIdToDelete(null);
  }

  const openAlert =(id)=>{
    setMyAlert(true);
    setIdToDelete(id);
  }

  //Auth context
  const { user } = useAuthContext();
  //Params
  const { id } = useParams();

  //Hooks
  const { invalidToken } = useToken();
  const { dateNowSQL } = useTimeNowSQL();

  const getSizesOptions = async () => {
    try {
      const res = await getSizeDisponibles(id);
      setSizes(res.data);
    } catch {
      setError(true);
    }
  };

  const getColorsOptions = async () => {
    try {
      const res = await getColorsDisponibles(id);
      setColors(res.data);
    } catch {
      setError(true);
    }
  };

  const getRankingData = async () => {
    try {
      if (user !== null) {
        const res = await validateRanking(id, user.Id);
        if (!res.data.length) {
          setRankingState(false);
          setRank(0);
        } else {
          setRank(res.data[0].Puntos);
          setRankingState(true);
          setDataRanking(res.data[0]);
        }
      }
    } catch (error) {
      setError(true);
    }
  };

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
      const res = await getCommentsForIdProduct(id, 20, 0);
      setComments(res.data);
    } catch (err) {
      setError(true);
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

  //Cycle life of component
  useEffect(() => {
    getRankingData();
    getData();
    getComments();
    getSizesOptions();
    getColorsOptions();
  }, []);

  const generateNewPrice = () => {
    let desc = parseFloat(data.Precio) * parseFloat(data.Descuento / 100);
    let newPrice = parseFloat(data.Precio) - parseFloat(desc);
    return newPrice;
  };

  const handleClickImg = () => {
    window.location.href = `${data.Imagen}`;
  };

  const generateComment = async () => {
    try {
      if (comment.message === "")
        return toast.error(`No puedes enviar un comentario sin contenido.`);
      const dataEndpoint = {
        comentario: comment.message,
        id_producto: parseInt(data.Id),
        id_usuario: parseInt(user.Id),
        fecha: dateNowSQL(),
      };
      await createComment(dataEndpoint, user.Token);
      toast.success(`¡Comentario pubilcado!`);
      setComments([]);
      getComments();
      setComment({ message: "" });
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else setError(true);
    }
  };

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

  const deleteC = async () => {
    try {
       await deleteComment(idToDelete, user.Token);
       toast.success(`¡Su comentario fue eliminado correctamente!`);
      setComments([]);
      getComments();
      closeAlert();
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else setError(true);
    }
  };

  const editRank = async (value) => {
    try {
      const dataR = {
        Puntos: value,
      };
      await updateRanking(dataRanking.Id, dataR, user.Token);
      setDataRanking({
        ...dataRanking,
        Puntos: dataR.Puntos,
      });
      toast.success(`¡Tu puntuación de este producto fue modificada!`);
      setRank(value);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else setError(true);
    }
  };

  const addRank = async (value) => {
    try {
      const dataR = {
        id_producto: id,
        id_usuario: user.Id,
        puntos: value,
      };
      await createRanking(dataR, user.Token);
      toast.success(`¡Agregaste una puntuación a este producto!`);
      getRankingData();
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else setError(true);
    }
  };

  const changeRanking = (value) => {
    if (rankingState === true) editRank(value);
    else addRank(value);
  };

  const validateFormCart = () => {
    if (
      parseInt(form.unidades) > data.Unidades ||
      form.unidades === "" ||
      form.size === "" ||
      form.color === ""
    )
      return true;
    else return false;
  };

  const addCart = async () => {
    try {
      const dataEndpoint = {
        id_producto: data.Id,
        id_usuario: user.Id,
        unidades: form.unidades,
        size: form.size,
        color: form.color,
        seleccionado: true,
      };
      if (validateFormCart())
        return toast.error(
          `Verifique que todos los campos esten llenos y que las unidades no sean mayores a las existentes.`
        );
      const res = await createCart(dataEndpoint, user.Token);
      toast.success(`¡Producto agregado al carrito!`);
      setForm(initialForm);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(`Acceso denegado, su sesión expiró`);
        invalidToken();
      } else setError(true);
    }
  };

  const handleCart = (e) => {
    e.preventDefault();
    addCart();
  };

  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      {error === true ? (
        <ErrorData />
      ) : (
        <article className="w-full gap-2 flex flex-col items-center mt-16 scale-up-center">
          <article className="flex w-11/12 gap-2 justify-between border-b mt-8 p-4">
            <div className="flex flex-col items-center">
              <img
                src={data.Imagen}
                alt={data.Id}
                onClick={handleClickImg}
                className=" w-60 h-60 object-cover rounded-md hover:scale-75 cursor-pointer transition-all"
              />
              <Rating
                className="text-yellow-500 mt-4"
                initialRating={rank}
                onChange={changeRanking}
                emptySymbol={"far fa-star"}
                fullSymbol={"fas fa-star"}
                fractions={2}
                readonly={user === null ? true : false}
              />
            </div>
            <div className="w-auto">
              <h3 className="text-center text-2xl p-2 uppercase font-semibold text-red-400">
                {data.Nombre}
              </h3>
              <p className="text-sm">{data.Descripcion}</p>
              {data.Descuento > 0 ? (
                <p className="p-1 font-semibold text-red-400">
                  <del>RD$ {data.Precio.toFixed(2)}</del> <br />{" "}
                  <span>RD$ {generateNewPrice().toFixed(2)}</span>
                </p>
              ) : (
                <p className="p-1 font-semibold text-red-400">
                  <span>RD$ {parseFloat(data.Precio).toFixed(2)}</span>
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
            <form onSubmit={handleCart} className="flex gap-2 flex-col">
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
                  {sizes.length
                    ? sizes.map((el, index) => (
                        <option key={index} value={el.Size}>
                          {el.Size}
                        </option>
                      ))
                    : ""}
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
                  {colors.length
                    ? colors.map((el, index) => (
                        <option key={index} value={el.Color}>
                          {el.Color}
                        </option>
                      ))
                    : ""}
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
                  <i className="fas fa-cart-plus p-1"></i>Guardar En El Carrito
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
                <>
                  <h2 className="uppercase text-red-400 font-semibold text-center">
                    Últimos 20 Comentarios
                  </h2>
                  {comments.map((el, index) => (
                    <CardComment key={index} data={el} deleteC={openAlert} />
                  ))}
                </>
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
                  className="border rounded-sm h-32 text-sm p-1 outline-none border-gray-400 w-56 focus:border-blue-500 focus:border-2 mt-1"
                  maxLength={150}
                ></textarea>
              </div>
              <button
                onClick={newComment}
                className="text-center bg-red-500 text-sm p-2 cursor-pointer text-white rounded-sm transition-all hover:bg-red-400"
              >
                <i className="fas fa-paper-plane p-1"></i>
                Comentar
              </button>
            </form>
          </article>
        </article>
      )}
      <Toaster position="top-center" />
      {myAlert && <MyAlert title={"Eliminar comentario"} text={"¿Estás seguro de eliminar este comentario?"} onClose={closeAlert} onAction={deleteC}/>}
    </section>
  );
}
