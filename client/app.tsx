import { Root, createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddTeacherAccountPage from './components/AddTeacherAccountPage/AddTeacherAccountPage';
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import InboxPage from './pages/InboxPage/InboxPage';
import LearningMaterialsPage from './pages/LearningMaterialsPage/LearningMaterialsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import StudentListPage from './pages/StudentListPage/StudentListPage';
import TeacherDetailPage from './pages/TeacherDetailPage/TeacherDetailPage';
import TeacherSearchPage from './pages/TeacherSearchPage/TeacherSearchPage';
import TeachingMaterialsPage from './pages/TeachingMaterialsPage/TeachingMaterialsPage';
import { UserProvider } from './context/UserContext';
import './app.css';

const container: HTMLElement = document.getElementById('app') || document.createElement('div')
container.id = 'app'
const root: Root = createRoot(container);
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
        <Route path="/teaching-materials" element={<TeachingMaterialsPage />}/>
        <Route path="/learning-materials" element={<LearningMaterialsPage />}/>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  </UserProvider>
);
