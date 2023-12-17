import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import '../Css/Pages/Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const usenavigate = useNavigate();

    const currentURL = window.location.href;
    console.log('CURRENTTTTTTTTTTTTT:', currentURL);
    let urlApi;
    if (currentURL.includes('172.16.16.3:3000')) {
      urlApi = process.env.REACT_APP_API_URL_HTTP;
    } else if (currentURL.includes('dashboard.par.co.id')) {
      urlApi = process.env.REACT_APP_API_URL;
    } else {
      urlApi = process.env.REACT_APP_API_URL;
    }
    // if (currentURL.includes('172.16.16.3:3000')) {
    //     urlApi = process.env.REACT_APP_API_URL_HTTP;
    //   } else {
    //     urlApi = process.env.REACT_APP_API_URL;
    //   }

    const proceedLoginUsingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
          setIsLoading(true); // Set loading to true when starting the login process
          setTimeout(() => {
            // Set isLoading to false after 3 seconds to mimic processing
            setIsLoading(false);
      
            // Additional logic after successful login
            console.log('Login successful!');
          }, 5000);
    
          let inputobj = {
            "email": email,
            "password": password
          };
    
          fetch(`${urlApi}api/login`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputobj)
          })
            .then((res) => {
              if (res.status === 401) {
                setShowNotification(true);
                sessionStorage.removeItem('jwttoken');
                Navigate('/');
                window.location.href = '/';
              }
              return res.json();
            })
            .then((resp) => {
              console.log(resp);
              if (Object.keys(resp).length === 0) {
                setShowNotification(true);
              } else {
                sessionStorage.setItem('jwttoken', resp.access_token);
                usenavigate('/main');
              }
            })
            .catch((err) => {
              if (err !== 'Unauthorized') {
                setShowNotification(true);
              }
            })
            .finally(() => {
              setIsLoading(false); // Set loading to false when the login process is complete
            });
        }
      };

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            setShowNotification(true);
        }
        if (password === '' || password === null) {
            result = false;
            setShowNotification(true);
        }
        return result;
    };

    const closeNotification = () => {
        setShowNotification(false);
    };
    useEffect(() => {
        const notificationTimeout = setTimeout(() => {
          closeNotification();
        }, 3000);
      
        return () => clearTimeout(notificationTimeout);
      }, [showNotification]);

    return (
        <div className="row d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
            <div className="col-lg-5">
                <form onSubmit={proceedLoginUsingAPI} className="container">
                    <div className="">
                        <div className="header">
                            <h2 className="text-center my-5">Login Dashboard</h2>
                        </div>
                        <div className="body">
                            <div className="form-group input-group-lg mt-3" >
                                <label><h3>User Name <span className="errmsg text-red">*</span></h3></label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control my-3" size="lg"></input>
                            </div>
                            <div className="form-group input-group-lg mt-4" >
                                <label><h3>Password <span className="errmsg text-red">*</span></h3></label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control my-3" size="lg"></input>
                            </div>
                        </div>
                        <div className="footer text-center mt-5">
                            <button type="submit" className="btn w-50 bg-blue text-white fwb" onClick={proceedLoginUsingAPI} disabled={isLoading}> {isLoading ? 'Memproses Login....' : 'Login'}</button>
                        </div>
                    </div>
                </form>
                {showNotification && (
                    <div className="custom-alert">
                    <p>Login gagal, pastikan email dan password benar</p>
                    {/* <button onClick={closeNotification}>Close</button> */}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Login;
