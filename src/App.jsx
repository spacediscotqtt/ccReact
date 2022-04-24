import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import {PayPalScriptProvider} from "@paypal/react-paypal-js"

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <PayPalScriptProvider options={{ "client-id": "AZNkf83ly9F9U4wjt_1FcORPFEaBD2cEJaQelNZqF4KvjwVkQZrkyKiXhAwjgyrMEyl1nYZQ6QghrQPr" }}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
      </PayPalScriptProvider>
    </Router>
  );
};

export default App;
