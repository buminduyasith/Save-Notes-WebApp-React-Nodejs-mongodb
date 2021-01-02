import React from 'react';
import {useEffect,useState} from 'react';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from "joi";
import {signup} from '../services/Authapi'
import logo from './810.gif'
import  { useHistory } from 'react-router-dom'
import axios from 'axios'

const schema = joi.object().keys({
    username:joi.string().alphanum().min(2).max(10).required(),
    fullname:joi.string().alphanum().min(4).max(10).required(),
    password:joi.string().trim().min(5).max(10).required(),
    cppassword: joi.any().equal(joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': 'confirm password not match' })
})
function Signup() {

    
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
            setlogerror("");


            
           if(errors){
              //  console.log(data);
                const user={
                    username:data.username,
                    password:data.password,
                    fullname:data.fullname
                }
                console.log(user);

                axios.post('http://localhost:8081/auth/signup',user)
                .then(function (response) {
                    // handle success
                    history.push("/login");
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log({error});
                    setlogerror(error.response.data.message);
                    console.log(error);
                })
                .then(function () {
                    setbtnsubmit(false);
                });

                /*fetch('http://localhost:8081/auth/signup',{

                    method:'post',
                    body:JSON.stringify(user),
                    headers:{
    
                        'content-type':'application/json'
                    }
    
    
                }).then(res=>{
                    console.log(res);
    
                    
                       
                        if(res.ok==false){
                            throw new Error('Required');
                        }
                        else{
                            return res.json();
                        }
                    
    
                    
                    })
    
                .then(data=>{
    
                    console.log(data);
                    setbtnsubmit(false);
                    setlogerror(data.message);

                   

                   // history.push("/login");
                    //return data;
    
                })
                
                .catch(error=>{
                    setbtnsubmit(false);
                    return error ;
                })*/
             

            }   
          
        })(e)
      }

    return (
        <div className='signup mt-3'>
            
            <h1 className='text-center'>Signup</h1>

            <div className="container">
                <div className="mx-auto">
                    <img src={logo} alt="loading..." className={`  d-none mx-auto  ${btnsubmit?"d-block":""} `} />
                </div> 

                <div  className ={`alert alert-danger d-none ${logerror ? "d-block" : ""}`} role="alert">
                    {logerror?logerror:""}
                </div>

                <form id="signupform" onSubmit={formSubmit} onSubmit={formSubmit} className={`${btnsubmit?"d-none":""} `}>
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username"  name="username" aria-describedby="usernameHelp"
                        ref={register}  />
                    
                    <small id="usernameHelp" className="form-text text-muted">
                    {/* ref={register ({ required: true ,minLength:2 })} */}
                        {/* {errors.username && errors.username.type=== 'required' && "Username is required"}
                        {errors.username && errors.username.type=== 'minLength' && "username should have atleast 2 letters"}
                            */}
                        {errors.username?.message}
                        </small>
                    </div>
                    <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname"  name="fullname" aria-describedby="fullnameHelp"
                        ref={register}  />
                    
                    <small id="fullnameHelp" className="form-text text-muted">
                    {/* ref={register ({ required: true ,minLength:2 })} */}
                        {/* {errors.username && errors.username.type=== 'required' && "Username is required"}
                        {errors.username && errors.username.type=== 'minLength' && "username should have atleast 2 letters"}
                            */}
                        {errors.fullname?.message}
                        </small>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password"  ref={register}  />
                                <small id="passwordHelp" className="form-text text-muted">{errors.password?.message}</small>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="cpassword">Confirm Password</label>
                                <input type="password" className="form-control" id="cpassword" name="cppassword"  ref={register} />
                                <small id="cpasswordHelp" className="form-text text-muted">{errors.cppassword?.message}</small>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary' >Submit</button>
                </form>
                

            </div>
           
       

            
        </div>
    )
}

export default Signup
