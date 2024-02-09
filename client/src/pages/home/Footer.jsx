import React from "react";
import imgFooter from "../../assets/follow.png";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#F5EEEE",
        height: "auto",
        padding: "10px",
        width: "100%",
      }}
      className="flex flex-col justify-center items-center"
    >
      <img className=" w-96 object-cover" src={imgFooter} alt="follow" data-aos="fade-in"/>
      <div className="flex items-center gap-4" data-aos="fade-in">
        <a
          href="https://www.youtube.com/@glowishfashion"
          className="text-red-500 bg-white rounded-full p-1 text-center text-xl w-10 h-10 transition-all hover:text-black" target="_blank"
        >
          <i className="fa-brands fa-youtube"></i>
        </a>
        <a
          href="https://www.facebook.com/glowishfashion.lv"
          className="text-red-500 bg-white rounded-full p-1 text-center text-xl w-10 h-10 transition-all hover:text-black" target="_blank"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a
          href="https://www.instagram.com/glowishfashion.lv/"
          className="text-red-500 bg-white rounded-full p-1 text-center text-xl w-10 h-10 transition-all hover:text-black" target="_blank"
        >
          <i className="fa-brands fa-square-instagram"></i>
        </a>
        <a
          href="https://www.tiktok.com/@glowishfashion.lv"
          className="text-red-500 bg-white rounded-full p-1 text-center text-xl w-10 h-10 transition-all hover:text-black" target="_blank"
        >
          <i className="fa-brands fa-tiktok"></i>
        </a>
      </div>
      <p className="p-2 text-center">Glowish Fashion LV © 2023. <br /> Todos los derechos reservados</p>
    </footer>
  );
}
