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

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Import and process data from data.json
    import('../../assets/data.json')
      .then(module => {
        const data = module.default;
        // Extract unique students
        const uniqueStudents = [];
        const studentIds = new Set();
        
        data.forEach(item => {
          if (!studentIds.has(item.student.id)) {
            studentIds.add(item.student.id);
            uniqueStudents.push({
              id: item.student.id,
              firstname: item.student.firstname,
              lastname: item.student.lastname,
              fullName: `${item.student.firstname} ${item.student.lastname}`
            });
          }
        });
        
        // Sort by lastname
        uniqueStudents.sort((a, b) => a.lastname.localeCompare(b.lastname));
        setStudents(uniqueStudents);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Students List
      </Typography>
      <Chip 
        label={`Total Students: ${students.length}`} 
        color="primary" 
        sx={{ marginBottom: 2 }}
      />
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="students table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Student ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Full Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' }, '&:hover': { backgroundColor: '#e3f2fd' } }}
              >
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstname}</TableCell>
                <TableCell>{student.lastname}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{student.fullName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentList;
