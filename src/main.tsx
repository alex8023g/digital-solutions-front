import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ExperimentPage } from './ExperimentPage.tsx';
import { ExperimentPage2 } from './ExperimentPage2.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/experiment' element={<ExperimentPage />} />
        <Route path='/experiment2' element={<ExperimentPage2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
