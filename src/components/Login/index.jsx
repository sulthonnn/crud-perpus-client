import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoginUser, reset } from "../../features/authSlice.jsx";

import { IoPersonSharp, IoLockClosed } from "react-icons/io5";
import { FcReadingEbook } from "react-icons/fc";
import background from "../../assets/background.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    dispatch(LoginUser({ email, password }));
    navigate("/");
  };

  console.log(user);

  return (
    <section
      className="hero is-fullheight is-fullwidth"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <a
        className="help has-text-black has-text-weight-bold mt-1"
        style={{ position: "relative", top: 0, left: "82%" }}
        href="http://www.freepik.com"
      >
        Designed by Katemangostar / Freepik
      </a>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <p className="title has-text-centered has-text-black is-uppercase">
                Student Library
              </p>
              <form onSubmit={Auth} className="box">
                <FcReadingEbook
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <h1 className="title is-3 has-text-centered mb-0">Sign in</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <p className="control has-icons-right">
                    <input
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <span className="icon is-small is-right">
                      <i>
                        <IoPersonSharp />
                      </i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-right">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*****"
                    />
                    <span className="icon is-small is-right">
                      <i>
                        <IoLockClosed />
                      </i>
                    </span>
                  </div>
                </div>
                {isError && (
                  <p className="help has-text-centered has-text-danger">
                    {message}
                  </p>
                )}
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
