import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddTeacherAccountPage from './components/AddTeacherAccountPage/AddTeacherAccountPage';
import AuthPage from './components/AuthPage/AuthPage';
import InboxPage from './components/InboxPage/InboxPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import StudentListPage from './components/StudentListPage/StudentListPage';
import TeacherDetailPage from './components/TeacherDetailPage/TeacherDetailPage';
import TeacherSearchPage from './components/TeacherSearchPage/TeacherSearchPage';
import { UserProvider } from './context/UserContext';

const container = document.getElementById('app') || document.createElement('div')
container.id = 'app'
const root = createRoot(container);
root.render(
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/auth/:method" element={<AuthPage />} />
        <Route path="/auth/:method/:accountType" element={<AuthPage />} />
        <Route path="/find-teachers" element={<TeacherSearchPage />} />
        <Route path="/my-students" element={<StudentListPage />} />
        <Route path="/teacher/:id" element={<TeacherDetailPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-account" element={<AddTeacherAccountPage />} />
      </Routes>
    </Router>
  </UserProvider>
);
