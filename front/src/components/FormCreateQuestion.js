import React, { useRef } from "react";

const FormCreateQuestion = (props) => {
  const formRef = useRef();

  const goCreateQuestion = (evt) => {
    evt && evt.preventDefault();

    const formData = new FormData(formRef.current);
    const programa = formData.get("programa");
    const materia = formData.get("materia");
    const pregunta = formData.get("question");
    const descripcion = formData.get("descripcion");
    console.log("dentro de goCreateQuestion");
    props.onCreateQuestion(programa, materia, pregunta, descripcion);
  };
  return (
    <div className="FormCreateQuestion">
      <form
        ref={formRef}
        method="POST"
        action="create"
        onSubmit={goCreateQuestion}
        id="createQuestion"
      >
        <label className="form-group">
          <span>Programa:</span>
          <input
            type="text"
            className="form-control"
            name="programa"
            required
          ></input>
          <span>Materia:</span>
          <input
            type="text"
            className="form-control"
            name="materia"
            required
          ></input>
          <span>Pregunta:</span>
          <input
            type="text"
            className="form-control"
            name="question"
            required
          ></input>
          <span>Descripción:</span>
          <textarea
            name="descripcion"
            form="createQuestion"
            placeholder="Incluye toda la información que consideres necesaria."
            required
          ></textarea>
          {props.user ? (
            <button
              type="button"
              onClick={goCreateQuestion}
              className="btn btn-primary"
            >
              Pregunta!
            </button>
          ) : (
            <button type="" className="btn btn-secondary" disabled>
              Inicia sesión para preguntar
            </button>
          )}
        </label>
      </form>
    </div>
  );
};

export default FormCreateQuestion;
