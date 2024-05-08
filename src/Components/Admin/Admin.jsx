import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/v2/adminlogin', adminDetails);
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in local storage
      console.log('Login successful');
      // Redirect to admin dashboard after login
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <section className="login-page">
        <div className="container">
          <div className="row align-items-center justify-content-center">
          <div className="col-lg-6">
          <img src="./src/assets/img/logo/logo_2.png" alt="" className="img-fluid " style={{width:"300px", height:"auto"}} />
          </div>
            <div className="col-lg-6">
              
              <div className="p-lg-5 px-3 py-5 bg-white rounded-4">
                <h3 className="mb-4">Login Your Account</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Email"
                      required="required"
                      autoComplete="off"
                      value={adminDetails.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="form_password"
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      autoComplete="off"
                      value={adminDetails.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-4 mb-4">
                    <div className="remember-checkbox d-flex align-items-center justify-content-between">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="remember"
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="default__button w-100" type="submit">
                    <span>Login Now</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
