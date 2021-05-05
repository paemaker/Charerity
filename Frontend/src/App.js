import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AdminRoute from './Components/Routes/AdminRoute';
import Basket from './Screens/Basket';
import Footer from './Components/Footer';
import Giver from './Screens/Giver';
import GiverRoute from './Components/Routes/GiverRoute';
import ItemDetails from './Screens/ItemDetails';
import ItemEdit from './Screens/ItemEdit';
import ItemList from './Screens/ItemList';
import Login from './Screens/Login';
import Navbar from './Components/Navbar';
import OrderHistory from './Screens/OrderHistory';
import OrderList from './Screens/OrderList';
import OrderOverview from './Screens/OrderOverview';
import Overview from './Screens/Overview';
import Payment from './Screens/Payment';
import PrivateRoute from './Components/Routes/PrivateRoute';
import Profile from './Screens/Profile';
import Register from './Screens/Register';
import SearchResult from './Screens/SearchResult';
import Shipping from './Screens/Shipping';
import Showitems from './Components/Showitems';
import UserEdit from './Screens/UserEdit';
import UserList from './Screens/UserList';

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
          <PrivateRoute exact path='/profile' component={Profile} />
          <AdminRoute exact path='/userlist' component={UserList} />
          <Route exact path='/detail/:id' component={ItemDetails} />
          <AdminRoute exact path='/itemlist' component={ItemList} />
          <Route exact path='/order/:id' component={OrderOverview} />
          <AdminRoute exact path='/orderlist' component={OrderList} />
          <Route exact path='/detail/:id/edit' component={ItemEdit} />
          <Route exact path='/orderhistory' component={OrderHistory} />
          <AdminRoute excact path='/user/:id/edit' component={UserEdit} />
          <GiverRoute exact path='/itemlist/giver' component={ItemList} />
          <Route exact path='/search/title/:title?'component={SearchResult} />
          <GiverRoute exact path='/orderlist/giver' component={OrderList} />
          <Route exact path='/search/category/:category'component={SearchResult} />
          <Route exact path='/search/category/:category/title/:title'component={SearchResult} />
        </Switch>

        <Footer />
      </Router>

    </>
  );
}

export default App;
