
import './App.css';
import Home from './components/Home';
import Log from './components/Log';
import Signup from './components/Signup';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Test from './Test'
import UserPrivateRoute from './UserPrivateRoute'
import Testwork from './Testwork'

function App() {
  return (
    
      
      <Router>
        <div className="App">
          <Header />
          <Switch>

         

     
      

            <Route path="/signup" component={Signup} />

            <Route path="/login" component={Log} />

            <UserPrivateRoute path="/dashboard" component={Dashboard} />

            <Route path="/test" component={Testwork} />

            <Route path="/" component={Home} />

            

          
          </Switch>

        </div>

    </Router>

   
  );
}

export default App;
