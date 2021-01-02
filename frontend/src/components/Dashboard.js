import React from 'react'
import {useEffect,useState} from 'react';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import * as joi from "joi";
import logo from './810.gif'
import Notes from '../components/Notes'
import  { useHistory } from 'react-router-dom'

const schema = joi.object().keys({
    notetitle:joi.string().min(2).max(30).required(),
    notediscription:joi.string().min(10).max(100).required()
})

var nnnotes;

const prefix = 'notessavenodeandreactapp';
function Dashboard() {

  
    let history = useHistory();
    const [logerror,setlogerror] = useState("");
    const [AllNotes,setAllNotes] = useState([]);
    const [user,setuser] = useState({});
    const [loadstate,setloadstate] = useState(true);
    const [formappear,setformappear] = useState(false);
   

    

    const { register,errors,handleSubmit,reset } = useForm({
        resolver: joiResolver(schema)
    });

    const formSubmit =  (e) => {
        e.preventDefault();
       
      
        handleSubmit((data) => {

           
           if(errors){
              //  console.log(data);
                const newNote={
                    title:data.notetitle,
                    discription:data.notediscription
                }
                console.log(newNote);

                reset();

                fetch('http://localhost:8081/api/v1/notes',{

                method:'post',
                body:JSON.stringify(newNote),
                headers:{

                    'content-type':'application/json',
                    authorization:`Bearer ${localStorage.getItem(prefix)}`
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

               setAllNotes(AllNotes=>[...AllNotes,data]);
               console.log(data);
               // alert("hi"+data.message);
                

            })
            
            .catch(error=>{
               
                alert("error " +error.message);
                return error ;
            })
                
               // setlogerror(results.message);
               
            

            }   
          
        })(e)
      }


    const logout = ()=>{
        localStorage.removeItem(prefix);
        history.push("/login");
    }

    const addanote = ()=>{

        if(formappear==false){
            setformappear(true);
        }
        else{
            setformappear(false);
        }

        
    }


    useEffect(()=>{
        fetch('http://localhost:8081',{

            method:'get',
            headers:{
                
                authorization:`Bearer ${localStorage.getItem(prefix)}`
               
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

            if(data.user){
               
               

                setuser(data.user);

                console.log(user);

                setloadstate(false);
                // setbtnsubmit(false);
                // setlogerror(data.message);
               

                fetch('http://localhost:8081/api/v1/notes',{

                    method:'get',
                    headers:{
                        
                        authorization:`Bearer ${localStorage.getItem(prefix)}`
                       
                    }

                }).then(result=>result.json())
                .then(notes=>{

                  
                  setAllNotes(notes.allnotes) ;
                   
                   
                 
        
                   
                   
                  

                })

            }
           
            else{

              
                localStorage.removeItem(prefix);

            }
          

        })
        
        .catch(error=>{
          
            console.log(error);
            setloadstate(false);
            setlogerror(error.message);
            //history.push("/login");
        })
       

    },[])
   
    

    return (
        <div className={`dashboard d-none ${loadstate?"":"d-block"}`} >
           <h1 className="text-center">Dashboard</h1>
             <div className="container">
                <div>
                <img src={logo} alt="loading..." className={` mx-auto d-none ${loadstate?"d-block":""} `} />
                    </div>   
                <div  className ={`alert alert-danger d-none ${logerror ? "d-block" : ""}`} role="alert">
                {logerror?logerror:""}
                
                </div>

               
                <div className="alert alert-info" role="alert">

                    <h3 className="text-capitalize text-danger" style={{textTransform:"capitalize"}}>Welcome to SaveNotes {user.username}</h3>
                    
                    <div className="div">
                    <button onClick={addanote} className="btn btn-primary mr-3">Add a Note</button>
                    <button onClick={logout} className="btn btn-primary">Log out</button>

                    </div>

                </div>

                <div className="Dashboard__save_notes">

                {/* className={`${btnsubmit?"":""} `} */} 
                <form id="savenotesform" onSubmit={formSubmit} className={`d-none ${formappear?'d-block':''}`} >

                <div className="form-group" >
                  <label htmlFor="notetitle">Note Title</label>
                  <input  ref={register}  type="text" className="form-control" id="notetitle" name="notetitle" aria-describedby="notetitleHelp" />
                  <small id="notetitleHelp" className="form-text text-muted"> {errors.notetitle?.message}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="notediscription">Note Discription</label>
                  <textarea   ref={register}   className="form-control" id="notediscription" name="notediscription" aria-describedby="notediscriptionHelp"/>
                  <small id="notediscriptionHelp" className="form-text text-muted"> {errors.notediscription?.message}</small>
                </div>
                <button type="submit" className="btn btn-primary">Save Note</button>
              </form>



                </div>

                <section className='row mt-3' >

                    {/* {
                        <div>{JSON.stringify(AllNotes)}</div>
                    } */}

                {
                    AllNotes?.map((note,id)=>{
                       return(
                           <Notes key={id}  note = {note} />
                       )
                    })
                } 

                </section>

                
                
               

            </div>

        </div>
    )
}

export default Dashboard
