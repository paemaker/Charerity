import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Basket from './Components/Basket';
import Footer from './Components/Footer';
import Payment from './Components/Payment';
import Profile from './Components/Profile';
import ItemList from './Components/ItemList';
import ItemEdit from './Components/ItemEdit';
import Shipping from './Components/Shipping';
import Overview from './Components/Overview';
import Register from './Components/Register';
import OrderList from './Components/OrderList';
import Showitems from './Components/Showitems';
import ItemDetails from './Components/ItemDetails';
import OrderHistory from './Components/OrderHistory';
import OrderOverview from './Components/OrderOverview';
import AdminRoute from './Components/Routes/AdminRoute';
import PrivateRoute from './Components/Routes/PrivateRoute';

function App() {
  return (
    <>

      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Showitems} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/payment' component={Payment} />
          <Route exact path='/shipping' component={Shipping} />
          <Route exact path='/overview' component={Overview} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/basket/:id?' component={Basket} />
          <Route exact path='/detail/:id' component={ItemDetails} />
          <Route exact path='/detail/:id/edit' component={ItemEdit} />
          <AdminRoute exact path='/itemlist' component={ItemList} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <AdminRoute exact path='/orderlist' component={OrderList} />
          <Route exact path='/order/:id' component={OrderOverview} />
          <Route exact path='/orderhistory' component={OrderHistory} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
