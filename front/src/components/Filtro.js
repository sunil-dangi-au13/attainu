import React, { useRef } from "react";

const Filtro = (props) => {
  const formRef = useRef();
  const formRef2 = useRef();
  const filtrarPrograma = (evt) => {
    evt && evt.preventDefault();
    const formData = new FormData(formRef.current);
    const filtro = formData.get("filtro");
    props.filtrarPrograma(filtro);
  };
  const filtrarMateria = (evt) => {
    evt && evt.preventDefault();
    const formData = new FormData(formRef2.current);
    const filtro = formData.get("filtro");
    props.filtrarMateria(filtro);
  };
  return (
    <div className="row">
      <div className="col-6">
        <form id="formSearch" ref={formRef}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por programa"
              name="filtro"
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              type="button"
              onClick={filtrarPrograma}
            >
              Filtrar
            </button>
          </div>
        </form>
      </div>
      <div className="col-6">
        <form id="formSearch2" ref={formRef2}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por materia"
              name="filtro"
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              type="button"
              onClick={filtrarMateria}
            >
              Filtrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filtro;
