import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Basket from './Components/Basket';
import DetailItem from './Components/DetailItem';
import Footer from './Components/Footer';
import ListItem from './Components/ListItem';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>

      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/' component={ListItem} />
          <Route exact path='/basket/:id' component={Basket} />
          <Route exact path='/detail/:id' component={DetailItem} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
