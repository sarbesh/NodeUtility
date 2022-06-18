import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import ReactPage from './components/React/React';
import Investment from './components/Investments/Investment';
import { Container } from '@mui/material';
import InvestmentAdd from './components/Investments/InvestmentAdd';
import Header from './components/Header/Header';
import AllStocks from './components/NSE/AllStocks';

function App() {
  const name = "Sarbesh";
  return (
    <div>
      <BrowserRouter>
        <Header name={name} />
        <Container id="main">
          <Routes>
              <Route index element={<Dashboard elem="Dashboard"/>}></Route>
              <Route path="/home" element={<Dashboard elem="dashboard"/>}></Route>
              <Route path="/react" element={<ReactPage />}></Route>
              <Route path="/investment" element={<Investment />}></Route>
              <Route path="/investment/add" element={<InvestmentAdd />}></Route>
              <Route path="/allstocks" element={<AllStocks />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
