import React, { useRef } from "react";

const Login = (props) => {
  const formRef = useRef();
  const onLogin = (evt) => {
    evt && evt.preventDefault();

    const formData = new FormData(formRef.current);
    const username = formData.get("username");
    const password = formData.get("password");
    console.log("dentro de onLogin", username, password);
    props.onLogin(username, password);
  };
  return (
    <div className="Login">
      <form action="/login" method="post" ref={formRef}>
        <div className="form-group">
          <label>
            <span>Username:</span>
            <input type="text" name="username" className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <label>
            <span>Password:</span>
            <input type="password" name="password" className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <button type="button" onClick={onLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
