import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, emailupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);

    // const ProceedLogin = (e) => {
    //     e.preventDefault();
    //     if (validate()) {
    //         ///implentation
    //         // console.log('proceed');
    //         fetch("http://localhost:8000/user/" + email).then((res) => {
    //             return res.json();
    //         }).then((resp) => {
    //             //console.log(resp)
    //             if (Object.keys(resp).length === 0) {
    //                 toast.error('Please Enter valid email');
    //             } else {
    //                 if (resp.password === password) {
    //                     toast.success('Success');
    //                     sessionStorage.setItem('email',email);
    //                     sessionStorage.setItem('userrole',resp.role);
    //                     usenavigate('/')
    //                 }else{
    //                     toast.error('Please Enter valid credentials');
    //                 }
    //             }
    //         }).catch((err) => {
    //             toast.error('Login Failed due to :' + err.message);
    //         });
    //     }
    // }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            let inputobj={"email": email,
            "password": password};
            fetch("https://apipatra.spero-lab.id/api/login",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                }else{
                     toast.success('Success');
                    //  sessionStorage.setItem('email',email);
                     sessionStorage.setItem('jwttoken',resp.access_token);
                   usenavigate('/Main')
                }
                // if (Object.keys(resp).length === 0) {
                //     toast.error('Please Enter valid email');
                // } else {
                //     if (resp.password === password) {
                //         toast.success('Success');
                //         sessionStorage.setItem('email',email);
                //         usenavigate('/')
                //     }else{
                //         toast.error('Please Enter valid credentials');
                //     }
                // }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
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
    return (
        <div className="row d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
            <div className="col-lg-5">
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="">
                        <div className="header">
                            <h2 className="text-center my-5">Login Dashboard</h2>
                        </div>
                        <div className="body">
                            <div className="form-group mt-3">
                                <label>User Name <span className="errmsg text-red">*</span></label>
                                <input value={email} onChange={e => emailupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group mt-3">
                                <label>Password <span className="errmsg text-red">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="footer text-center mt-5">
                            <button type="submit" className="btn w-50 btn-primary">Login</button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;