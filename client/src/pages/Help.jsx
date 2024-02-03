import React from "react";
import MenuUser from "../components/MenuUser";
import "../assets/css/animation.css";
import helpIMG from "../assets/help.png";

export default function Help() {
  return (
    <section className="flex flex-col h-screen">
      <MenuUser />
      <article className="w-full gap-2 flex flex-col items-center mt-16 scale-up-center">
        <h2
          className="text-xl font-bold uppercase text-red-400 p-2 text-center"
          style={{
            letterSpacing: "10px",
          }}
        >
          ¿Necesitas ayuda?
        </h2>
        <img
          src={helpIMG}
          alt="Help"
          className="rounded-md object-cover"
          style={{
            width: "500px",
          }}
        />
        <p className="text-center w-96 block text-sm">
          Si tienes algunos problemas con tu cuenta no esperes más. Comunicate
          con nosotros ahora mismo para resolver todos tus problemas. Envíanos
          un correo a <span className="text-red-500 font-bold">glowishfashionlv@gmail.com</span> y estaremos
          atentos a tus problemas para ayudarte lo más rápido posible.
        </p>
      </article>
    </section>
  );
}
