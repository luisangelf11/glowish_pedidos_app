import React from "react";
import '../assets/css/loader.css'

export default function Loader({elementRef}) {
  return (
    <div className="lds-ring m-auto p-2" ref={elementRef}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
