import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Footer from "./layout/Footer.js";
import Questions from "./components/Questions.js";
import FormCreateQuestion from "./components/FormCreateQuestion.js";
import Login from "./components/Login.js";
import Answers from "./components/Answers.js";
import FormCreateAnswer from "./components/FormCreateAnswer.js";
import FormCreateUser from "./components/FormCreateUser.js";
import Filtro from "./components/Filtro.js";
let initialQuestions = [];

const App = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    console.log("get user");
    fetch("/getUser")
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, []);

  useEffect(() => {
    fetch("/getQuestions")
      .then((res) => res.json())
      .then((ques) => setQuestions(ques));
  }, []);

  const onCreateQuestion = (programa, materia, preg, descripcion) => {
    console.log("dentro de onCreate", programa, materia, preg, descripcion);
    const preguntita = {
      programa: programa,
      materia: materia,
      question: preg,
      descripcion: descripcion,
    };
    fetch("/create", {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preguntita),
    })
      .then((res) => res.json())
      .then((pregu) => {
        console.log(pregu);
        // window.location = `/preguntas/${pregu[0]._id}`;
        // window.location.href = `/preguntas/${pregu[0]._id}`;
        window.location = "/";
        window.location.href = "/";
        return setQuestion(pregu[0]);
      });
  };

  const onCreateAnswer = (question, answer) => {
    console.log("dentro de app creating Answer ", question, answer);
    let newAnswers = [...question.answers];
    newAnswers.push({ answer: answer, votes: 0, username: user.username });
    question.answers = newAnswers;
    console.log(question.answers);
    setQuestion(question);
    fetch(`/${question._id}/createAnswer`, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    })
      .then((res) => res.json())
      .then((preg) => setQuestions(preg));
  };
  const onVote = (question, answer) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];

      const qObj = newQuestions.find((q) => q.question === question);
      const newAnswers = qObj.answers.map((a) =>
        a.answer === answer
          ? { answer: a.answer, votes: a.votes + 1, username: user.username }
          : a
      );
      qObj.answers = newAnswers;
      fetch(`/${qObj._id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qObj),
      });
      return newQuestions;
    });
  };

  const onLogout = () => {
    fetch("/logout")
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          setUser(null);
        } else {
          alert("error");
        }
      });
  };

  const onLogin = (usrname, usrpassword) => {
    const usr = { username: usrname, password: usrpassword };
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usr),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          // window.location = `/iniciarsesion`;
          // window.location.href = `/iniciarsesion`;
          window.location = "/";
          window.location.href = "/";
        } else {
          alert("error");
        }
      });
  };

  const onRegister = (username, password, name) => {
    const usr = { username: username, password: password, name: name };
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usr),
    });
  };

  function Home() {
    return (
      <div className="">
        <h2>Bienvenidos a PreguntAndes</h2>
        <div className="row">
          <div className="col-12 col-lg-4 Home">
            <div className="Home-box">
              <div className="col-12 Icon">
                <i className="fa fa-question-circle"></i>
              </div>
              <div className="col-12">
                <p>
                  PreguntAndes es una herramienta que te permite hacer preguntas
                  sobre materias específicas de tu carrera. De la misma forma,
                  permite que entre estudiantes nos colaboremos.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 Home">
            <div className="Home-box">
              <div className="col-12 Icon">
                <i className="fa fa-search"></i>
              </div>
              <div className="col-12">
                <p>
                  Puedes ver y filtrar las preguntas siempre. Si quieres una
                  experiencia más completa, Inicia Sesión o Regístrate para
                  poder hacer preguntas, responder y votar.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 Home">
            <div className="Home-box">
              <div className="col-12 Icon">
                <i className="fa fa-users"></i>
              </div>
              <div className="col-12">
                <p>
                  Surgimos como una alternativa a la virtualización. Pasa la voz
                  para que nos ayudemos en comunidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function About() {
    return <h2>About</h2>;
  }

  function CrearPregunta() {
    return (
      <div>
        <h2>Preguntar: </h2>
        <FormCreateQuestion user={user} onCreateQuestion={onCreateQuestion} />
      </div>
    );
  }

  function IniciarSesion() {
    return (
      <div>
        {!user ? (
          <div className="row">
            <div className="col-6">
              <h2> Inicia Sesión: </h2>
              <Login onLogin={onLogin} />
            </div>
            <div className="col-6">
              <h2> Regístrate: </h2>
              <FormCreateUser onRegister={onRegister} />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <p>
                Bienvenido! <b>{user.username}</b>
              </p>
              <p>
                Ahora tienes total acceso y puedes preguntar, responder y votar.
              </p>
            </div>
            <div className="form-group">
              <button onClick={onLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const filtrarPrograma = (filtro) => {
    fetch(`/getQuestions/${filtro}`)
      .then((res) => res.json())
      .then((preg) => {
        console.log(preg);
        return setQuestions(preg);
      });
  };
  const filtrarMateria = (filtro) => {
    fetch(`/getQuestions/materia/${filtro}`)
      .then((res) => res.json())
      .then((preg) => {
        console.log(preg);
        return setQuestions(preg);
      });
  };

  function Preguntas() {
    let match = useRouteMatch();

    return (
      <div className="preguntas-section">
        <h2>Preguntas</h2>
        <div className="Filtro">
          <Filtro
            filtrarPrograma={filtrarPrograma}
            filtrarMateria={filtrarMateria}
          />
        </div>
        <div className="preguntas">
          <div>
            <Questions
              user={user}
              questions={questions}
              onVote={onVote}
              match={match}
            />
          </div>
        </div>

        {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
        <Switch>
          <Route path={`${match.path}/:id`}>
            <Pregunta />
          </Route>
          <Route path={match.path}>
            <h3>Selecciona una pregunta para visualizarla.</h3>
          </Route>
        </Switch>
      </div>
    );
  }

  const findQuestion = (id) => {
    console.log("El id que estoy buscando es: ", id);
    questions.map((q) => {
      console.log("El id actual es: ", q._id);
      if (q._id === id) {
        console.log("Son iguales");
        console.log(q);
        setQuestion(q);
      }
      return true;
    });
  };
  function Pregunta() {
    let { id } = useParams();
    findQuestion(id);
    console.log("Funciona coño", question);
    return (
      <div key={"question" + id} className="pregunta-section">
        {question ? (
          <div>
            <h2> Aquí está la pregunta: </h2>
            <div className="itemQuestion">
              <h3>{question.question}</h3>
              <p>
                <b>{question.username}</b> preguntó el {question.timestamp}
              </p>
              <p>{question.descripcion}</p>
            </div>
            <Answers
              _id={question._id}
              user={user}
              answers={question.answers}
              question={question.question}
              username={question.username}
              onVote={onVote}
            />
            <FormCreateAnswer
              user={user}
              onCreateAnswer={onCreateAnswer}
              question={question}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <div className="container info">
        <div className="row">
          <div className="col-12">
            <Router>
              <nav
                id="navbar"
                className="navbar navbar-expand-lg navbar-dark bg-dark"
              >
                <a className="navbar-brand" href="/">
                  PreguntAndes
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <div className="row menu-navbar">
                    <div className="col-12">
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link" to="/">
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/preguntas">
                            Preguntas
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/crearPregunta">
                            Preguntar
                          </Link>
                        </li>
                        <li className="nav-item menu-login">
                          {!user ? (
                            <Link className="nav-link" to="/iniciarsesion">
                              {" "}
                              Iniciar Sesión / Registro{" "}
                            </Link>
                          ) : (
                            <Link className="nav-link" to="/iniciarsesion">
                              {" "}
                              Perfil{" "}
                            </Link>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="contenido">
                <Switch>
                  <Route path="/preguntas">
                    <Preguntas />
                  </Route>
                  <Route path="/crearPregunta">
                    <CrearPregunta />
                  </Route>
                  <Route path="/iniciarsesion">
                    <IniciarSesion />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
