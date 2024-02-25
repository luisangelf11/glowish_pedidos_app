import React, { useEffect, useState } from "react";
import { getUser } from "../api/user";
import userIcon from "../assets/userIcon.jpg";
import { useAuthContext } from "../context/authContext";
import { formatDistanceToNow } from 'date-fns';

export default function CardComment({ data, deleteC }) {
  const { Fecha, Id_Usuario, Comentario, Id } = data;
  const [dataUser, setDataUser] = useState({});
  const { user } = useAuthContext();
  const getDataUser = async () => {
    try {
      const res = await getUser(Id_Usuario);
      setDataUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  function convertDateNowSQL(date) {
    const today = new Date(date);
    let day = today.getDate();
    let month = 1 + today.getMonth();
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <div className="flex gap-8 p-4 h-auto border-b w-96 mt-2" data-aos="zoom-in-up">
      <div className="flex gap-2">
        {dataUser.Avatar === "" ? (
          <img
            src={userIcon}
            alt="user"
            className="w-10 rounded-full object-cover h-10"
          />
        ) : (
          <img
            src={dataUser.Avatar}
            alt="user"
            className="w-10 rounded-full object-cover h-10"
          />
        )}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-red-400 font-semibold p-1 text-sm">
        {dataUser.Nombre} {dataUser.Apellido}
        </span>
        <div className="flex gap-4">
          <p>{Comentario}</p>
          {user !== null && user.Id === dataUser.Id ? (
            <button onClick={()=> deleteC(Id)} className="p-1 text-red-700 cursor-pointer transition-all hover:text-red-600">
              <i className="fas fa-trash"></i>
            </button>
          ) : (
            ""
          )}
        </div>
        <span className="text-sm text-gray-500"> {formatDistanceToNow(new Date(Fecha), { addSuffix: true })}</span>
      </div>
    </div>
  );
}
