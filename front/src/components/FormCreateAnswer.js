import React, { useRef } from "react";

const FormCreateAnswer = (props) => {
  const formRef = useRef();

  const goCreateAnswer = (evt) => {
    evt && evt.preventDefault();

    const formData = new FormData(formRef.current);
    const answer = formData.get("answer");
    console.log("dentro de goCreateAnswer");
    props.onCreateAnswer(props.question, answer);
  };
  return (
    <div className="FormCreateAnswer">
      <h3> O bien, responder la pregunta: </h3>
      <form
        ref={formRef}
        onSumbit={goCreateAnswer}
        method="post"
        action={`/questions/${props.question._id}/createAnswer`}
        id="createAnswer"
      >
        <label className="form-group">
          <span>Tu respuesta:</span>
          <textarea
            name="answer"
            form="createAnswer"
            placeholder="Escribe aquí tu respuesta y ayuda a un compañero."
            required
          ></textarea>
          {props.user ? (
            <button
              type="button"
              onClick={goCreateAnswer}
              className="btn btn-primary"
            >
              Responde!
            </button>
          ) : (
            <button type="" className="btn btn-secondary" disabled>
              Inicia sesión para responder
            </button>
          )}
        </label>
      </form>
    </div>
  );
};

export default FormCreateAnswer;
