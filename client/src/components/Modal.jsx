import React from 'react'
import '../assets/css/animation.css'

export default function Modal({onClose, children, title}) {
  return (
    <div className="fixed inset-0  flex items-center justify-center overflow-x-hidden overflow-y-hidden outline-none focus:outline-none scale-up-center w-screen h-screen" style={{
        zIndex: '1000'
    }}>
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none" style={{
        zIndex: '1000'
    }}>
              <div className="p-5 border-b border-solid rounded-t border-blueGray-200" >
                <h3 className="text-2xl text-center font-semibold uppercase">
                  {title}
                </h3>
              </div>
              <div className="relative p-6 flex-auto overflow-y-auto h-60">
                {children}
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 text-sm mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onClose}
                >
                  CERRAR
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
  )
}
