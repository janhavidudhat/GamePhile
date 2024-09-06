import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/** importing our pages */
import x from './tracks';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<x.Tracks />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}
