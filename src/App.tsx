import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Map from './pages/Map';
import Submit from './pages/Submit';
import Community from './pages/Community';
import Settings from './pages/Settings';

import Verify from './pages/Verify';
import Forms from './pages/Forms';
import Species from './pages/Species';
import SpeciesDetail from './pages/SpeciesDetail';
import TreeDetail from './pages/TreeDetail';

import Profile from './pages/Profile';
import Legends from './pages/Legends';
import CreateForm from './pages/CreateForm';
import SelectTreeForForm from './pages/SelectTreeForForm';
import Reports from './pages/Reports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="map" element={<Map />} />
            <Route path="submit" element={<Submit />} />
            <Route path="community" element={<Community />} />
            <Route path="verify" element={<Verify />} />
            <Route path="profile" element={<Profile />} />
            <Route path="forms" element={<Forms />} />
            <Route path="species" element={<Species />} />
            <Route path="species/:speciesId" element={<SpeciesDetail />} />
            <Route path="tree/:treeId" element={<TreeDetail />} />
            <Route path="legends" element={<Legends />} />
            <Route path="forms/create" element={<CreateForm />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;