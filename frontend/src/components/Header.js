import React from 'react'
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div className="header">

<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          Notes
        </Link>
      
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
            <Link to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
            </Link>
             
            </li>
            <li className="nav-item">

                <Link to="/signup" className="nav-link">
                    SIGN-UP
                </Link>

              
            </li>
            <li className="nav-item">

                <Link to="/login" className="nav-link">
                    SIGN-IN
                </Link>
              
            </li>

            <li className="nav-item">

                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              
            </li>
            
          </ul>
        </div>
      </nav>

      
        </div>
    )
}

export default Header
