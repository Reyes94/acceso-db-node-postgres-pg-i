import { useState } from "react";

function Form({ titulo, imgSrc, descripcion, setTitulo, setImgSRC, setDescripcion, agregarPost }) {

  const [error, setError] = useState("")

  const handleAgregarPost = () => {

    setError("")
    if (!titulo || !imgSrc || !descripcion) return setError("Por favor completa todos los campos");

    agregarPost();

    setTitulo("");
    setImgSRC("");
    setDescripcion("");

    setTimeout(() => {                          //para mostrar alert después que formulario se haya limpiado
      alert("Post agregado con éxito");
    }, 4);
  }

    return (
      <div className="form">
        <div className="mb-2">
          <h6>Agregar post</h6>
          <label>Título</label>
          <input
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label>URL de la imagen</label>
          <input
            value={imgSrc}
            onChange={(event) => setImgSRC(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Descripción</label> <br />
          <textarea
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <div className="d-flex">
          <button onClick={handleAgregarPost} className="btn btn-light m-auto">
            Agregar
          </button>
        </div>
        <p className="mt-2">{error}</p>
      </div>
    );
  }


export default Form;
