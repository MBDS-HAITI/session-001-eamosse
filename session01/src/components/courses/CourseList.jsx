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
    fetch('http://localhost:8010/api/courses')
    .then(response => response.json())
      .then(data => {
        setCourses(data);
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
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow
                key={index}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' }, '&:hover': { backgroundColor: '#f3e5f5' } }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  {course._id}
                </TableCell>
                <TableCell align="center">{course.name}</TableCell>
                <TableCell align="center">{course.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CourseList;
