import React, { useEffect, useState } from "react";
import imgDesc from "../assets/descuentoIcon.png";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating";
import { getAVG } from "../api/ranking";
import { getColorsDisponibles } from "../api/colors";
import { getSizeDisponibles } from "../api/sizes";
import CircleColor from "./CircleColor";
import TagsSizes from "./TagsSizes";

export default function ItemProduct({ data }) {
  const [ranking, setRanking] = useState(0);
  const {
    Id,
    Nombre,
    Precio,
    Unidades,
    Descripcion,
    Imagen,
    Descuento,
    Categoria,
  } = data;

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const getColorsAndSizes = async()=>{
    try{
      const resColors = await getColorsDisponibles(Id);
      const resSizes = await getSizeDisponibles(Id);
      setColors(resColors.data);
      setSizes(resSizes.data);
    }
    catch(err){
      console.log(err)
    }
  }

  const getRanking = async (id) => {
    try {
      const res = await getAVG(id);
      if (res.data.Promedio) setRanking(res.data.Promedio);
      else setRanking(0);
    } catch (err) {
      console.log(err);
    }
  };

  const generateNewPrice = () => {
    let desc = parseFloat(Precio) * parseFloat(Descuento / 100);
    let newPrice = parseFloat(Precio) - parseFloat(desc);
    return newPrice;
  };

  const handleClickImg = () => {
    window.location.href = `${Imagen}`;
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/catalogo/${Id}`);
  };

  useEffect(() => {
    getRanking(Id);
    getColorsAndSizes();
  }, []);

  return (
    <div
      className="flex justify-start gap-2 mt-2 border-b w-1/2"
      data-aos="zoom-in-up"
    >
      <div className="w-11/12 flex gap-8">
        <div>
          <img
            src={Imagen}
            alt={Id}
            onClick={handleClickImg}
            className="w-48 h-48 object-cover rounded-md hover:scale-75 cursor-pointer transition-all"
          />
          <h3 className="text-center text-base p-2 uppercase font-semibold text-red-400">
            {Nombre}
          </h3>
        </div>
        <div className="w-auto">
          <p className="text-sm">{Descripcion}</p>
          {Descuento > 0 ? (
            <p className="p-1 font-semibold text-red-400">
              <del>RD$ {Precio.toFixed(2)}</del> <br />{" "}
              <span>RD$ {generateNewPrice().toFixed(2)}</span>
            </p>
          ) : (
            <p className="p-1 font-semibold text-red-400">
              <span>RD$ {parseFloat(Precio).toFixed(2)}</span>
            </p>
          )}
          {Descuento > 0 ? (
            <div className="flex items-center gap-2 p-2">
              <img className="w-6 h-6" src={imgDesc} alt="icon-descuento" />
              <p className="text-sm font-semibold text-slate-600">
                {Descuento}%
              </p>
            </div>
          ) : (
            ""
          )}
          <p className="text-xs text-gray-600 font-semibold">
            Unidades disponibles: {Unidades}
          </p>
          {Categoria && (
            <span
              className="p-1 text-center mt-2 border rounded-xl block text-xs text-red-500"
              style={{
                width: "40%",
              }}
            >
              {Categoria}
            </span>
          )}
          <div className="mt-2 flex justify-start gap-2">
            {colors.map((el, index)=> <CircleColor key={index} rgb={el.Rgb}/>)}
          </div>
          <div className="mt-2 flex justify-start gap-2">
            {sizes.map((el, index)=> <TagsSizes key={index} name={el.Size}/>)}
          </div>
          <Rating
            className="text-yellow-500 mt-4"
            readonly={true}
            initialRating={ranking}
            emptySymbol={"far fa-star"}
            fullSymbol={"fas fa-star"}
            fractions={2}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end items-end p-2">
        <button
          onClick={handleClick}
          className="bg-red-500 p-2 w-10 rounded-md text-sm text-white transition-all hover:bg-red-400"
        >
          Ver
        </button>
      </div>
    </div>
  );
}
