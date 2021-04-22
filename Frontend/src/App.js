import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AdminRoute from './Components/Routes/AdminRoute';
import Basket from './Components/Basket';
import Footer from './Components/Footer';
import Giver from './Components/Giver';
import GiverRoute from './Components/Routes/GiverRoute';
import ItemDetails from './Components/ItemDetails';
import ItemEdit from './Components/ItemEdit';
import ItemList from './Components/ItemList';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import OrderHistory from './Components/OrderHistory';
import OrderList from './Components/OrderList';
import OrderOverview from './Components/OrderOverview';
import Overview from './Components/Overview';
import Payment from './Components/Payment';
import PrivateRoute from './Components/Routes/PrivateRoute';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Shipping from './Components/Shipping';
import Showitems from './Components/Showitems';
import UserEdit from './Components/UserEdit';
import UserList from './Components/UserList';

function App() {
  return (
    <>

      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Showitems} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/giver/:id' component={Giver} />
          <Route exact path='/payment' component={Payment} />
          <Route exact path='/shipping' component={Shipping} />
          <Route exact path='/overview' component={Overview} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/basket/:id?' component={Basket} />
          <AdminRoute exact path='/userlist' component={UserList} />
          <Route exact path='/detail/:id' component={ItemDetails} />
          <Route exact path='/detail/:id/edit' component={ItemEdit} />
          <AdminRoute exact path='/itemlist' component={ItemList} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <AdminRoute exact path='/orderlist' component={OrderList} />
          <AdminRoute excact path='/user/:id/edit' component={UserEdit} />
          <GiverRoute exact path='/itemlist/giver' component={ItemList} />
          <GiverRoute exact path='/orderlist/giver' component={OrderList} />
          <Route exact path='/order/:id' component={OrderOverview} />
          <Route exact path='/orderhistory' component={OrderHistory} />
        </Switch>

        <Footer />
      </Router>

    </>
  );
}

export default App;
