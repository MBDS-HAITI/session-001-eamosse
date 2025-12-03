import './App.css'
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import StudentList from './components/students/StudentList.jsx';
import CourseList from './components/courses/CourseList.jsx';
import GradeList from './components/grades/GradeList.jsx';
import Test from './components/Test.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const menus = [
    { title: 'Accueil', view: 'home' },
    { title: 'Cours', view: 'courses' },
    { title: 'Étudiants', view: 'students' },
    { title: 'Notes', view: 'grades' }
  ];

  const renderView = () => {
    switch (currentView) {
      case 'courses':
        return <CourseList />;
      case 'students':
        return <StudentList />;
      case 'grades':
        return <GradeList />;
      default:
        return (
          <Container sx={{ padding: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom color="primary">
              Bienvenue dans le système de gestion
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Sélectionnez une option dans le menu pour commencer
            </Typography>
          </Container>
        );
    }
  };

  return (
    <>
      <AppBar position="static" elevation={4}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: 4 }}>
            📚 Student Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menus.map((menu, index) => (
              <Button
                key={index}
                onClick={() => setCurrentView(menu.view)}
                sx={{
                  color: 'white',
                  backgroundColor: currentView === menu.view ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {menu.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      {renderView()}
      <Test />
    </>
  )
}

export default App
