import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, isAutheticated, authenticate } from "../auth/helper";

const Singnin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        didRedirect: false,
        loading: false
    });

    const {email, password, error, didRedirect, loading} = values;

    const {user} = isAutheticated();

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        signin({email,password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, loading:false})
            }else {
                authenticate(data, () => {
                    setValues({...values, didRedirect: true})
                })
            }
        })
        .catch(console.log("signin request failed"))
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAutheticated()){
            return <Redirect to="/" />
        }
    }
    const handleChange = event => {
        setValues({...values, error: false, [event.target.name]: event.target.value});
    };
    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return(
        <div className="row" >
            <div className="col-md-6 offset-sm-3 text-left">    
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
            </div> 
        </div>        
        )
    }

    const signInForm = () => {
        return(
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input name="email" value={email} onChange={handleChange} className="form-control" type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input name="password" value={password} onChange={handleChange} className="form-control" type="password"/>
                        </div>
                        <button onClick={onSubmit} className="form-control btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Sign in page" description="A page user to sign in!">
            { loadingMessage() }
            { errorMessage() }
            { signInForm()  }
            { performRedirect() }
            <p className="text-white text-center">{ JSON.stringify(values) }</p>
        </Base>
    );
};

export default Singnin;