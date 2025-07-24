import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminAuth from './components/AdminAuth';
import AdminDashboard from './components/Dashboard/Admindashboard';
import AdminAddCarForm from './components/Dashboard/AddCarForm';
import ProtectedAdminRoute from './components/Dashboard/ProtectedAdminRoute';
import ManageCars from './components/Dashboard/ManageCars';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminAuth />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        >
          <Route path="add-car" element={<AdminAddCarForm />} />
          <Route path="/dashboard/manage-cars" element={<ManageCars/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
