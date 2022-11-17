import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';
import ChatInbox from './components/ChatInbox/ChatInbox';
import StudentListPage from './components/StudentListPage/StudentListPage';
import TeacherDetailPage from './components/TeacherDetailPage/TeacherDetailPage';
import TeacherSearchPage from './components/TeacherSearchPage/TeacherSearchPage';
import { UserProvider, useUserContext } from './context/UserContext';

function RouteList() {
  const { user } = useUserContext();
  
  return (
    <Routes>
      <Route path="/auth/:method" element={<AuthPage />} />
      <Route path="/auth/:method/:accountType" element={<AuthPage />} />
      <Route path="/find-teachers" element={<TeacherSearchPage />} />
      <Route path="/my-students" element={<StudentListPage />} />
      <Route path="/teacher/:id" element={<TeacherDetailPage />} />
      {user && <Route path="/inbox" element={<ChatInbox user={user} />} />}
    </Routes>
  )
}

const container = document.getElementById('app') || document.createElement('div')
container.id = 'app'
const root = createRoot(container);
root.render(
    <UserProvider>
      <Router>
        <RouteList />
      </Router>
    </UserProvider>
);
