import './App.css';
import AddProducts from './components/AddProducts';
import ProductsList from './components/ProductsList';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
   
   <Router>
      <div className="container container-fluid min-vh-100 d-flex flex-column">
        <Routes>
          <Route
            exact
            path="/"
            element={<ProductsList />}
            component={ProductsList}
          />
          <Route
            exact
            path="/add"
            element={<AddProducts />}
            component={AddProducts}
          />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
