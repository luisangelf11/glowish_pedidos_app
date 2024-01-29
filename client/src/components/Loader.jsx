import React from "react";
import '../assets/css/loader.css'

export default function Loader() {
  return (
    <div className="lds-ring m-auto">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
