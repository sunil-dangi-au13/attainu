import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const Questions = (props) => {
  const renderQuestions = () => {
    console.log("questions", props.user);
    return props.questions.map((q, i) => (
      <div key={"question" + i} className="question">
        <div className="row">
          <div className="col-6">
            <Link to={`${props.match.url}/${q._id}`}>{q.question}</Link>
          </div>
          <div className="col-6">
            <div className="col-12 right">
              <span>{q.programa}</span>
            </div>
            <div className="col-12 right">
              <span>{q.materia}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  return <div className="Questions">{renderQuestions()}</div>;
};

Questions.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default Questions;
