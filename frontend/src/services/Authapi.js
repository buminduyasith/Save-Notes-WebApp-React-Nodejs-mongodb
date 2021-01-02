function signup(user){
    fetch('http://localhost:8081/auth/signup',{

                method:'post',
                body:JSON.stringify(user),
                headers:{

                    'content-type':'application/json'
                }


            }).then(res=>{
                console.log(res);

                
                    return res.json();
                

                
                })

            .then(data=>{

                console.log(data);
                return data;

            })
            
            .catch(error=>{
                return error ;
            })
}

function loging(user){
    fetch('http://localhost:8081/auth/log',{

                method:'post',
                body:JSON.stringify(user),
                headers:{

                    'content-type':'application/json'
                }


            }).then(res=>{
                console.log(res);

                
                    return res.json();
                

                
                })

            .then(data=>{

                console.log(data);
                return data;

            })
            
            .catch(error=>{
                return error ;
            })
}

module.exports = {
    signup,
    loging
}