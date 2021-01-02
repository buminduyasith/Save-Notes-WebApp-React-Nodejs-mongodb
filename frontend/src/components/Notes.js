import React from 'react'


function Notes({note:{title,discription,time}}){

    return (
        <div className="col-4">

            <div className="card border-info mb-3" >

                <div className="card-header">
                   <h2 className='text-center text-wrap' style={{textTransform:"capitalize"}}>{title}</h2> 
                   {/* text-truncate */}
                </div>

                <div className="card-body">
                    <p className="card-text text-left">{discription}</p>
                    <small className="text-center text-muted">{time}</small>
                </div>
                


            </div>


            
        </div>
    )
}

export default Notes
