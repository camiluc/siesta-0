import React, { useState } from "react";
import UploadPhoto from "../utils/upload-handler";

import Link from "next/link";

export default function IndexPage() {
  const [step, setStep] = useState(0);
  const [start, setStart] = useState(false);

  const asignaturas = ["inglés", "matemáticas", "ciencias", "lenguaje"];
  const motivo = ["médico", "laboral", "otro"];

  return (
    <div className="App">
      <div className="flex h-14 items-center bg-black">
        <div className="text-white ml-10 text-xl">siestá</div>
        <svg viewBox="0 0 512 512" className="h-6 fill-current text-white ">
          <path d="M274.3,0C249,0,228,17.7,221.7,41.1c-6.4-2.6-13.2-4.6-20.6-4.6c-30.1,0-54.9,24.8-54.9,54.9V288l-16-16   c-21.3-21.3-56.4-21.3-77.7,0s-21.3,56.4,0,77.7l124,124c21.5,21.4,51.2,38.3,86.3,38.3h84.6c70.5,0,128-57.5,128-128V164.6   c0-30.1-24.8-54.9-54.9-54.9c-6.4,0-12.5,1.4-18.3,3.4V91.4c0-30.1-24.8-54.9-54.9-54.9c-7.4,0-14.1,1.9-20.6,4.6   C320.6,17.7,299.6,0,274.3,0z M274.3,36.6c10.4,0,18.3,7.9,18.3,18.3v182.9h36.6V91.4c0-10.4,7.9-18.3,18.3-18.3   s18.3,7.9,18.3,18.3v146.3h36.6v-73.1c0-10.4,7.9-18.3,18.3-18.3c10.4,0,18.3,7.9,18.3,18.3V384c0,50.7-40.7,91.4-91.4,91.4h-84.6   c-23.3,0-43.3-11.4-60-28L78.3,324c-7.3-7.3-7.3-19,0-26.3c7.3-7.3,19-7.3,26.3,0l46.9,47.4l31.4,31.4V91.4   c0-10.4,7.9-18.3,18.3-18.3s18.3,7.9,18.3,18.3v146.3H256V54.9C256,44.5,263.9,36.6,274.3,36.6z" />
        </svg>
      </div>

      <div className="flex justify-center mt-8 text-xl ">
        <div className="w-96">
          <h1 className="mb-3">Hola Fernanda, qué necesitas?</h1>
          <div className="">
            <div className="mb-1.5 pl-10">
              necesito{" "}
              <button
                className="text-white rounded-lg bg-blue-700 px-2"
                onClick={(e) => setStart(!start)}
              >
                justificar
              </button>{" "}
              una inasistencia
            </div>

            <div className={start ? "" : "hidden"}>
              <p>por favor, indícanos estos datos..</p>
              <div
                className={`${
                  step === 0 ? "" : "hidden"
                } bg-green-100 rounded-lg px-8 py-6 my-3 w-9/12 m-auto`}
              >
                <div className="flex justify-between">
                  <label htmlFor="">asignatura:</label>
                  <select type="text" className="w-32 h-7 text-sm">
                    <option value=""></option>
                    {asignaturas.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between">
                  <label htmlFor="">fecha:</label>
                  <input type="date" className="w-32 h-7 text-sm" />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="">motivo:</label>
                  <select type="text" className="w-32 h-7 text-sm">
                    <option value=""></option>
                    {motivo.map((e) => (
                      <option key={e}>{e}</option>
                    ))}{" "}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    className="text-white rounded-lg bg-blue-700 px-2 mt-3"
                    onClick={(e) => setStep(1)}
                  >
                    listo
                  </button>
                </div>
              </div>

              <div className={step >= 1 ? "" : "hidden"}>
                <div className="bg-green-100 rounded-lg px-6 py-4 my-3 w-9/12 m-20">
                  <p className="text-sm">lunes, 10 de mayo | inglés | médico</p>
                </div>
                <p className="mb-2">perfecto, ahora sube tu certificado:</p>

                <div
                  className={`${
                    step === 1 ? "" : "hidden"
                  } flex justify-center`}
                >
                  <input
                    type="file"
                    className="w-32"
                    // onChange={(e) => setStep(2)}
                    // onChange={(e) => console.log("hola")}
                    onChange={UploadPhoto}
                  />
                </div>
              </div>

              <div className={`${step >= 2 ? "" : "hidden"}`}>
                <div className="bg-green-100 rounded-lg px-6 py-4 my-3 w-9/12 m-20">
                  <p className="text-sm">certificado.pdf</p>
                </div>
                <p className="mb-2">puedes agregar un comentario..</p>
                <div className="flex justify-center w-9/12 m-auto">
                  <input
                    type="textarea"
                    placeholder="(opcional)"
                    className="w-72 h-8 text-sm border-2 border-gray-300 border-solid rounded-lg mr-1"
                  />
                  <button className="text-white rounded-lg bg-blue-700 px-2 ">
                    omitir
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`${start ? "hidden" : ""}`}>
            <div className="mb-3 pl-10">
              quiero ver el{" "}
              <button className="text-white rounded-lg bg-blue-700 px-2">
                estado
              </button>{" "}
              de una justificación
            </div>

            <div className="mb-1.5 pl-10">
              <button className="text-white rounded-lg bg-gray-500 px-2">
                actualizar
              </button>{" "}
              mis datos de contacto
            </div>
            <div className="pl-10">
              <button className="text-white rounded-lg bg-gray-500 px-2">
                ver
              </button>{" "}
              el historial de justificaciones
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
