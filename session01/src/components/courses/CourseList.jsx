import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip
} from '@mui/material';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    import('../../assets/data.json')
      .then(module => {
        const data = module.default;
        const courseMap = new Map();
        
        data.forEach(item => {
          if (!courseMap.has(item.course)) {
            courseMap.set(item.course, {
              name: item.course,
              studentCount: 0,
              grades: []
            });
          }
          const course = courseMap.get(item.course);
          course.studentCount++;
          course.grades.push(item.grade);
        });
        
        const coursesWithStats = Array.from(courseMap.values()).map(course => {
          const avgGrade = (course.grades.reduce((sum, grade) => sum + grade, 0) / course.grades.length).toFixed(1);
          return {
            name: course.name,
            studentCount: course.studentCount,
            averageGrade: parseFloat(avgGrade)
          };
        });
        
        coursesWithStats.sort((a, b) => a.name.localeCompare(b.name));
        setCourses(coursesWithStats);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Courses List
      </Typography>
      <Chip 
        label={`Total Courses: ${courses.length}`} 
        color="secondary" 
        sx={{ marginBottom: 2 }}
      />
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="courses table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#9c27b0' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course Name</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Number of Students</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Average Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow
                key={index}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' }, '&:hover': { backgroundColor: '#f3e5f5' } }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  {course.name}
                </TableCell>
                <TableCell align="center">{course.studentCount}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={course.averageGrade} 
                    color={course.averageGrade >= 70 ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CourseList;
