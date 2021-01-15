import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Singnup = () => {

    const [values,setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    var {name, email, password, error, success} = values;

    const handleChange = event => {
        setValues({...values, error: false, [event.target.name]: event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
        .then(data => {
            console.log(data.error);
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }else{
                setValues({
                    ...values,
                    name: "", email: "", password: "", error: "", success: true
                });
            }
        })
        .catch(console.log("error in signup "));
    };

    const signUpForm = () => {
        return(
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input name="name" value={name} className="form-control" onChange={handleChange} type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input  name="email" value={email} className="form-control" onChange={handleChange} type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input name="password" value={password} className="form-control" onChange={handleChange} type="password"/>
                        </div>
                        <button onClick={onSubmit} className="form-control btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    };

    const successMessage = () => {
        return(
        <div className="row" >
            <div className="col-md-6 offset-sm-3 text-left"> 
                <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                    New account was created successfully. Please <Link to="/signin">Login Here</Link>
                </div>
            </div>
        </div>    
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
    return (
        <Base title="Sign up page" description="A page user to sign up!">
            { successMessage() }
            { errorMessage() }
            { signUpForm() }
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Singnup;