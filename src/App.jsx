// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserIdProvider } from './components/UserIdContext';
import Card from './components/Card';
import Cheated from './components/Cheated';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard'; // Ensure this component exists

function App() {
  return (
    <UserIdProvider>
      <Router>
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<> <Card /> <Cheated /> </>} />
            <Route path="/searchboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </Router>
    </UserIdProvider>
  );
}

export default App;
