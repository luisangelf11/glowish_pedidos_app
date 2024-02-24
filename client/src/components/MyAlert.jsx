import React from 'react'
import "../assets/css/animation.css"

export default function MyAlert({onClose, title, text,onAction}) {
  return (
    <div className="fixed inset-0  flex items-center justify-center overflow-x-hidden overflow-y-hidden outline-none focus:outline-none w-screen h-screen" style={{
        zIndex: '1000'
    }}>
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none scale-up-center" style={{
        zIndex: '1000'
    }}>
              <div className="p-5 border-b border-solid rounded-t border-blueGray-200" >
                <h3 className="text-xl text-center font-semibold uppercase text-red-500">
                  {title}
                </h3>
              </div>
              <div className="relative p-6 flex-auto h-auto">
                {text}
              </div>
              <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-blueGray-200">
              <button
                  className="text-white bg-blue-600 hover:bg-blue-500 rounded-sm font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 text-sm mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onAction}
                >
                  SI
                </button>
                <button
                  className="text-white bg-red-600 hover:bg-red-500 rounded-sm font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 text-sm mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onClose}
                >
                  NO
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
  )
}
