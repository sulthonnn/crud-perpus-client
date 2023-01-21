import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

const AddMember = () => {
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("M");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const createMember = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/member", {
        _id: ID,
        name,
        gender,
        address,
        email,
        phone,
      });
      navigate("/members");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        return;
      }
    }
  };

  return (
    <div className="container is-fluid">
      <h1 className="title">Members</h1>
      <h2 className="subtitle">Add New Member</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={createMember}>
              <div className="field">
                <label className="label">ID</label>
                <div className="control">
                  <input
                    type="text"
                    pattern="\d*"
                    maxLength="10"
                    minLength="10"
                    className="input"
                    value={ID}
                    onChange={(e) => setID(e.target.value)}
                    placeholder="ID"
                    required={true}
                  />
                </div>
              </div>
              <p className="help has-text-danger">{message}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Gender</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required={true}
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Address</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    type="text"
                    pattern="\d*"
                    maxLength="13"
                    minLength="11"
                    className="input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="11-13 length"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                  <Link to={"/members"} className="button is-info ml-3">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
