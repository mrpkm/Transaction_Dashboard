import logo from './logo.svg';
import './App.css';
import Transaction from './pages/transaction/Transaction';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import Statics from './pages/statics/Statics';
import Chart from './pages/chart/Chart';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/"
            element={
              <>
                <Header />
                <Transaction />
              </>
            }
          />
          <Route path="/chart"
            element={
              <>
                <Header />
                <Chart />
              </>
            }
          />
          <Route path="/statics"
            element={
              <>
                <Header />
                <Statics />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
