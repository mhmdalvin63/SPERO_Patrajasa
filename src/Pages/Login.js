import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, emailupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj = {
                "email": email,
                "password": password
            };
            fetch("https://apipatra.spero-lab.id/api/login", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            })
            .then((res) => {
                if (res.status === 401) {
                    // Token unauthorized, perform logout action
                    toast.error('Token unauthorized. Logging out...');
                    sessionStorage.removeItem('jwttoken');
                    usenavigate('/'); // Redirect to the login page
                    window.location.href = '/';
                    return Promise.reject('Unauthorized');
                }
                return res.json();
            })
            .then((resp) => {
                console.log(resp);
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('jwttoken', resp.access_token);
                    usenavigate('/main');
                }
            })
            .catch((err) => {
                if (err !== 'Unauthorized') {
                    toast.error('Login Failed due to: ' + err.message);
                }
            });
        }
    }

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }


// Set a timer to remove the token after 10 seconds
// setTimeout(function() {
//   sessionStorage.removeItem('jwttoken');
// }, 10000); // 10000 milliseconds = 10 seconds

    return (
        <div className="row d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
            <div className="col-lg-5">
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="">
                        <div className="header">
                            <h2 className="text-center my-5">Login Dashboard</h2>
                        </div>
                        <div className="body">
                            <div className="form-group input-group-lg mt-3" >
                                <label><h3>User Name <span className="errmsg text-red">*</span></h3></label>
                                <input value={email} onChange={e => emailupdate(e.target.value)} className="form-control my-3" size="lg"></input>
                            </div>
                            <div className="form-group input-group-lg mt-4" >
                                <label><h3>Password <span className="errmsg text-red">*</span></h3></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control my-3" size="lg"></input>
                            </div>
                        </div>
                        <div className="footer text-center mt-5">
                            <button type="submit" className="btn w-50 bg-blue text-white fwb">Login</button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

