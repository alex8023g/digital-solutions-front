import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './HomePage.tsx';
import { ExperimentPage2 } from './ExperimentPage2.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/experiment' element={<ExperimentPage />} /> */}
        <Route path='/experiment2' element={<ExperimentPage2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
