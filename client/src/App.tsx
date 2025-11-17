import React from 'react';
import AppLayout from '/router/layouts/AppLayout';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '/router/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
