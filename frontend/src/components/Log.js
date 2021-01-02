import React from 'react'
import {useState} from 'react';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from "joi";
import logo from './810.gif';
import  { useHistory } from 'react-router-dom';

 const schema = joi.object().keys({
    username:joi.string().alphanum().min(2).max(10).required(),
    password:joi.string().trim().min(5).max(10).required(),
   
})

const prefix = 'notessavenodeandreactapp';



function Log() {

    let history = useHistory();
    const [logerror,setlogerror] = useState("");
    const [btnsubmit,setbtnsubmit] = useState(false);

    const { register,errors,handleSubmit, } = useForm({
        resolver: joiResolver(schema)
    });

    const formSubmit =  (e) => {
        e.preventDefault();
        // do your early validation here
       // console.log(errors);
      
        handleSubmit((data) => {

            setbtnsubmit(true);
           if(errors){
              //  console.log(data);
                const user={
                    username:data.username,
                    password:data.password
                }
                console.log(user);

                fetch('http://localhost:8081/auth/log',{

                method:'post',
                body:JSON.stringify(user),
                headers:{

                    'content-type':'application/json'
                }


            }).then(res=>{
                console.log(res);

                    if(res.ok){
                        return res.json();
                
                    }
                
                    return res.json().then(err=>{
                        throw new Error(err.message);
                    })

                
                })

            .then(data=>{

               
                localStorage.setItem(prefix, data.token);
                setbtnsubmit(false);
                setlogerror(data.message);
                history.push("/dashboard");

            })
            
            .catch(error=>{
                setbtnsubmit(false);
                setlogerror(error.message);
                return error ;
            })
                
               // setlogerror(results.message);
               
            

            }   
          
        })(e)
      }

    return (
        <div className="log mt-3">
             <h1 className="text-center">Sign in</h1>
             <div className="container">
              <div>
              <img src={logo} alt="loading..." className={` mx-auto d-none ${btnsubmit?"d-block":""} `} />
                </div>   
             <div  className ={`alert alert-danger text-capitalize d-none ${logerror ? "d-block" : ""}`} role="alert">
              {logerror?logerror:""}
            </div>
            <form id="loginform" onSubmit={formSubmit} className={`${btnsubmit?"d-none":""} `}>
                <div className="form-group" >
                  <label htmlFor="username">Email address</label>
                  <input  ref={register}  type="text" className="form-control" id="username" name="username" aria-describedby="usernameHelp" />
                  <small id="usernameHelp" className="form-text text-muted"> {errors.username?.message}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input  ref={register}  type="password" className="form-control" id="password" name="password"/>
                  <small id="passwordHelp" className="form-text text-muted"> {errors.password?.message}</small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
        </div>
            
        </div>
    )
}

export default Log

