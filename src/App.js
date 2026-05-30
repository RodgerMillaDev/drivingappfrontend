import logo from './logo.svg';
import { BrowserRouter,Routes,Route } from 'react-router';
import './App.css';
import Dashboard from './pages/dashboard';
import UploadQuestion from './components/adminuploadquestions';
import Auth from './pages/auth';
import AuthProvider from './firebase/authprovider';
import ReadCourseM1 from './pages/readcoursem1';
import ReadCourseM2 from './pages/readcoursem2';
import ReadCourseM3 from './pages/readcoursem3';
import Test from './pages/test';
import ReadCourseM4 from './pages/readcoursem4';
import ReadCourseM5 from './pages/readcoursem5';
import Complete from './pages/paymentcomplete';
import Failed from './pages/paymentfailed';
import Protected from './pages/protected';
import Subuser from './pages/subuser';
import Landing from './pages/landing';
import AdminRoute from './pages/adminprotected';

import CompleteTest from './pages/complete';
function App() {

  return (
  
    <div>
     <BrowserRouter>
     <AuthProvider/>
     <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/auth" element={<Auth/>}/>
      
      <Route 
      path="/dashboard" 
      element={
        <Protected>
          <Dashboard/>
        </Protected>

        } 
        />
      <Route 
      path="/subuser" 
      element={
        <Protected>
        <AdminRoute>
          <Subuser/>
        </AdminRoute>
        </Protected>

        } 
        />
      <Route 
      path="/completetest" 
      element={
        <Protected>
          <CompleteTest/>
        </Protected>

        } 
        />
        <Route
         path='/upload' 
        element={
          <Protected>
               <UploadQuestion />
          </Protected>
        }
        />
        <Route
         path='/test' 
        element={
          <Protected>
               <Test />
          </Protected>
        }
        />

        <Route
         path='/readcourse/introduction-to-defensive-driving' 
        element={
          <Protected>
              
               <ReadCourseM1 />
          </Protected>
        }
        />
        <Route
         path='/readcourse/georgia-traffic-laws-and-safe-driving-responsibilities' 
        element={
          <Protected>
              
               <ReadCourseM2 />
          </Protected>
        }
        />
        <Route
         path='/readcourse/hazard-recognition-and-risk-management' 
        element={
          <Protected>
              
               <ReadCourseM3 />
          </Protected>
        }
        />
        <Route
         path='/readcourse/collision-avoidance-and-emergency-maneuvers' 
        element={
          <Protected>
              
               <ReadCourseM4 />
          </Protected>
        }
        />
        <Route
         path='/readcourse/driver-attitude-fatigue=and-long-term-safety' 
        element={
          <Protected>
              
               <ReadCourseM5 />
          </Protected>
        }
        />
        <Route
         path='/paymentcomplete' 
        element={
          <Protected>
  
               <Complete />
          </Protected>
        }
        />
        <Route
         path='/paymentfailed' 
        element={
          <Protected>
  
               <Failed />
          </Protected>
        }
        />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
