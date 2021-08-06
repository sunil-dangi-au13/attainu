import React, { useRef } from "react";
//import PropTypes from "prop-types";

const Answers = (props) => {
  const formRef = useRef();

  const renderAnswers = () =>
    props.answers.map((a, i) => (
      <div className="itemAnswer" key={"answer" + a + props.question + i}>
        <div>
          <p>
            <b>{a.username}</b> respondió:{" "}
          </p>
        </div>
        <div className="row">
          <div className="col-9">
            <p>{a.answer}</p>
          </div>
          <div className="col-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <label className="labelAnswer">
                    <input
                      className="inputElement"
                      type="radio"
                      name="answer"
                      value={a.answer}
                      required={true}
                    />
                  </label>
                  <div className="answerElement">
                    <div className="row">
                      <div className="col-2">
                        <p>
                          <i class="fa fa-heart gold" />
                          <span> {a.votes} likes </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  const onVote = (evt) => {
    evt && evt.preventDefault();

    const formData = new FormData(formRef.current);
    const answer = formData.get("answer");
    props.onVote(props.question, answer);
  };
  console.log("answers", props.user);
  return (
    <div className="Answers">
      <h3> Lo que otros compañeros han opinado: </h3>
      <form
        ref={formRef}
        onSubmit={onVote}
        action={`questions/${props._id}/update`}
        method="post"
      >
        {renderAnswers()}
        <h4>
          Puedes votar a la respuesta que consideras, resuelve la pregunta.{" "}
        </h4>
        {props.user ? (
          <button type="sumbit" className="my-3 btn btn-primary">
            Vote
          </button>
        ) : (
          <button type="" className="my-3 btn btn-secondary" disabled>
            Inicia sesión para responder
          </button>
        )}
      </form>
    </div>
  );
};

// Answers.propTypes = {
//   : PropTypes.
// };

export default Answers;
