// App.js
import React from 'react';
import SendMessages from './components/SendMessages';
import TemplateCreation from './components/templateCreation';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



//create routes and 2 buttons for the 2 routes
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path = "/" element = {<div>
            <Link to="/sendMessages">
              <button>Send Message</button>
            </Link>
            <Link to="/templateCreation">
              <button>Template Creation</button>
            </Link>
          </div>} />
          <Route path="/sendMessages" element = {<SendMessages />} ></Route>
          <Route path="/templateCreation" element = {<TemplateCreation />} ></Route>
        </Routes>

    </Router>


  );
};

export default App;
