import React, { useRef } from "react";

const FormCreateUser = (props) => {
  const formRef = useRef();
  const onRegister = (evt) => {
    evt && evt.preventDefault();

    const formData = new FormData(formRef.current);
    const username = formData.get("username");
    const password = formData.get("password");
    const name = formData.get("name");
    console.log("dentro de onCreate", username, password, name);
    props.onRegister(username, password, name);
  };
  return (
    <div className="Register">
      <form action="/register" method="post" ref={formRef}>
        <div className="form-group">
          <label>
            <span>Username:</span>
            <input type="text" name="username" className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <label>
            <span>Name:</span>
            <input type="text" name="name" className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <label>
            <span>Password:</span>
            <input type="password" name="password" className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <button
            type="sumbit"
            onSubmit={onRegister}
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreateUser;
