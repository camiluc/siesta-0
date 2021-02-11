import React, { useState } from "react";
import UploadPhoto from "../utils/upload-handler";
import { useUser } from "../lib/hooks";

// import Link from "next/link";

// export default function IndexPage() {
export default function Menu() {
  // useUser({ redirectTo: "/" });
  const user = useUser({ redirectTo: "/" });

  const [step, setStep] = useState(0);
  const [start, setStart] = useState(false);
  const [certName, setCertName] = useState("");
  const [savedStep, setSavedStep] = useState(0);
  const [data, setData] = useState({
    asignatura: "",
    fecha: "",
    motivo: "",
    comentario: ""
  });
  const name = "Fernanda";
  const pid = 22868762;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const asignaturas = ["inglés", "matemáticas", "ciencias", "lenguaje"];
  const motivo = ["médico", "laboral", "otro"];

  async function fileUploadHandler(e) {
    if (!e.target.files.length) {
      console.log("cancele");
      return;
    }
    // if (!e.target.files[0]?.name) {
    //   console.log("cancele");
    //   return;
    // }
    setCertName(e.target.files[0].name);
    setStep(2);
    let res = await UploadPhoto(e, pid);
    console.log("photo-url: ", res);
    // mensaje de error
    if (!res) {
      setStep(1);
    }
    // if (res) setStep(2);
  }

  return (
    <div className="App">
      <div className="flex justify-center h-14 bg-black">
        <div className="flex items-center w-72">
          <div className="text-white text-xl">siestá</div>
          <svg viewBox="0 0 512 512" className="h-6 fill-current text-white ">
            <path d="M274.3,0C249,0,228,17.7,221.7,41.1c-6.4-2.6-13.2-4.6-20.6-4.6c-30.1,0-54.9,24.8-54.9,54.9V288l-16-16   c-21.3-21.3-56.4-21.3-77.7,0s-21.3,56.4,0,77.7l124,124c21.5,21.4,51.2,38.3,86.3,38.3h84.6c70.5,0,128-57.5,128-128V164.6   c0-30.1-24.8-54.9-54.9-54.9c-6.4,0-12.5,1.4-18.3,3.4V91.4c0-30.1-24.8-54.9-54.9-54.9c-7.4,0-14.1,1.9-20.6,4.6   C320.6,17.7,299.6,0,274.3,0z M274.3,36.6c10.4,0,18.3,7.9,18.3,18.3v182.9h36.6V91.4c0-10.4,7.9-18.3,18.3-18.3   s18.3,7.9,18.3,18.3v146.3h36.6v-73.1c0-10.4,7.9-18.3,18.3-18.3c10.4,0,18.3,7.9,18.3,18.3V384c0,50.7-40.7,91.4-91.4,91.4h-84.6   c-23.3,0-43.3-11.4-60-28L78.3,324c-7.3-7.3-7.3-19,0-26.3c7.3-7.3,19-7.3,26.3,0l46.9,47.4l31.4,31.4V91.4   c0-10.4,7.9-18.3,18.3-18.3s18.3,7.9,18.3,18.3v146.3H256V54.9C256,44.5,263.9,36.6,274.3,36.6z" />
          </svg>
        </div>
      </div>

      {/* <div className="flex justify-center mt-8 mx-6 sm:text-xl "> */}
      <div className="flex justify-center mt-8 ">
        <div className="w-72">
          <h1 className="mb-1.5">Hola {user?.email}, qué necesitas?</h1>
          {/* master path ⬇⬇⬇ */}
          <div>
            <div className="pl-4">
              deseo{" "}
              <button
                className="text-white rounded-xl bg-blue-700 px-3 py-1.25 focus:outline-none"
                onClick={() => setStart(!start)}
              >
                justificar
              </button>{" "}
              una inasistencia
            </div>

            <div className={`${start ? "" : "hidden"} mt-1.5`}>
              <p>por favor, indícanos estos datos..</p>
              <div
                className={`${
                  step === 0 ? "" : "hidden"
                } bg-green-100 rounded-lg px-8 py-6 my-3 w-auto m-auto shadow-2xl`}
              >
                <div className="flex justify-between items-center">
                  <label htmlFor="">asignatura:</label>
                  <select
                    type="text"
                    className="w-32 px-2"
                    // onChange={handleChange}
                    onChange={handleChange}
                    name="asignatura"
                  >
                    <option value=""></option>
                    {asignaturas.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <label htmlFor="">fecha:</label>
                  <input
                    type="date"
                    className="w-32 px-2 sm:text-xs"
                    onChange={handleChange}
                    name="fecha"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <label htmlFor="">motivo:</label>
                  <select
                    type="text"
                    className="w-32 px-2"
                    onChange={handleChange}
                    name="motivo"
                  >
                    <option value=""></option>
                    {motivo.map((e) => (
                      <option key={e}>{e}</option>
                    ))}{" "}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    className="text-white rounded-sm bg-blue-600 px-5 py-1 mt-4"
                    onClick={() => {
                      if (data.asignatura && data.fecha && data.motivo) {
                        savedStep ? setStep(savedStep) : setStep(1);
                      }
                    }}
                  >
                    listo
                  </button>
                </div>
              </div>
              <div className={`${step >= 1 ? "" : "hidden"} grid`}>
                <div
                  className="justify-self-end text-sm bg-green-100 rounded-lg px-6 py-4 my-3 opacity-100 w-auto "
                  onClick={() => {
                    setSavedStep(step);
                    setStep(0);
                    // setStart(true);
                  }}
                >
                  {/* <p className="text-sm"> */}
                  {data.fecha} , {data.asignatura} , {data.motivo}
                  {/* </p> */}
                </div>
                <p className="mb-2">perfecto, ahora sube tu certificado:</p>

                <div className={`${step === 1 ? "" : "hidden"}`}>
                  <div className="flex justify-center">
                    <label className="text-white rounded-full bg-blue-600 px-3 py-1">
                      subir
                      <input
                        type="file"
                        className="hidden"
                        onChange={fileUploadHandler}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className={`${step >= 2 ? "" : "hidden"}`}>
                {/* <div className="justify-self-end bg-green-100 rounded-lg px-6 py-4 my-3 w-60 "> */}
                <div className="grid">
                  <div className="justify-self-end bg-green-100 rounded-lg px-6 py-4 my-3 w-auto text-sm break-all ">
                    {certName}
                  </div>
                </div>
                {/* </div> */}
                <p className="mb-2">puedes agregar un comentario..</p>
                <div
                  className={`${
                    step >= 3 ? "hidden" : ""
                  } flex justify-center w-9/12 m-auto`}
                >
                  <input
                    type="text"
                    placeholder="(opcional)"
                    className="w-72 border-2 border-gray-300 border-solid rounded-lg mr-1"
                    onChange={handleChange}
                    name="comentario"
                  />
                  <button
                    className={`${
                      data.comentario ? "bg-green-600" : "bg-blue-700"
                    } text-white rounded-lg px-2`}
                    onClick={() => setStep(3)}
                  >
                    {data.comentario ? "ok" : "omitir"}
                  </button>
                </div>
              </div>
              <div className={`${step >= 3 ? "" : "hidden"}`}>
                <div className="grid">
                  <div className="justify-self-end bg-green-100 rounded-lg px-6 py-4 my-3 w-60">
                    <p className="text-sm">
                      {data.comentario ? data.comentario : "* sin comentario *"}
                    </p>
                  </div>
                </div>
                <p>gracias, estamos listos para procesar tu solicitud.</p>
                <button
                  className={`${
                    step === 4 ? "hidden" : ""
                  } text-white rounded-lg bg-blue-600 px-3 py-1 my-2 m-auto block`}
                  onClick={() => setStep(4)}
                >
                  enviar
                </button>
              </div>
              <div className={`${step === 4 ? "" : "hidden"} my-3`}>
                <p>
                  {name}, tu solicitud a sido ingresada
                  <span role="img" aria-label="">
                    👍
                  </span>
                </p>
                <p>
                  Te enviaremos un mensaje cuando tu solicitud haya sido
                  resuelta. Esto puede demorar hasta 3 días.
                </p>
              </div>
            </div>
          </div>

          <div className={`${start ? "hidden" : ""}`}>
            <div className="pl-4 mt-3">
              <button className="text-white rounded-lg bg-gray-500 px-2">
                actualizar
              </button>{" "}
              mis datos de contacto
            </div>
            <div className="pl-4 mt-1.5">
              <button className="text-white rounded-lg bg-gray-500 px-2">
                ver
              </button>{" "}
              mi historial de justificaciones
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
