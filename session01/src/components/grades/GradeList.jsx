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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent
} from '@mui/material';

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id');

  useEffect(() => {
    // Import data from data.json
    import('../../assets/data.json')
      .then(module => {
        setGrades(module.default);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  }, []);

  // Filter grades
  const filteredGrades = grades.filter(item => {
    if (filter === 'pass') return item.grade >= 70;
    if (filter === 'fail') return item.grade < 70;
    return true;
  });

  // Sort grades
  const sortedGrades = [...filteredGrades].sort((a, b) => {
    if (sortBy === 'grade') return b.grade - a.grade;
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    return a.unique_id - b.unique_id;
  });

  const passCount = grades.filter(g => g.grade >= 70).length;
  const failCount = grades.filter(g => g.grade < 70).length;
  const averageGrade = grades.length > 0 
    ? (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(1) 
    : 0;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Grades List
      </Typography>
      
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', backgroundColor: '#e3f2fd' }}>
              <Typography variant="h4" color="primary">{grades.length}</Typography>
              <Typography variant="body2">Total Grades</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', backgroundColor: '#e8f5e9' }}>
              <Typography variant="h4" color="success.main">{passCount}</Typography>
              <Typography variant="body2">Passing (≥70)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', backgroundColor: '#ffebee' }}>
              <Typography variant="h4" color="error">{failCount}</Typography>
              <Typography variant="body2">Failing (&lt;70)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', backgroundColor: '#fff3e0' }}>
              <Typography variant="h4" color="warning.main">{averageGrade}</Typography>
              <Typography variant="body2">Average Grade</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All Grades</MenuItem>
            <MenuItem value="pass">Passing Only</MenuItem>
            <MenuItem value="fail">Failing Only</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="grade">Grade</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="grades table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2e7d32' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Student Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedGrades.map((item) => (
              <TableRow
                key={item.unique_id}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' }, '&:hover': { backgroundColor: '#e8f5e9' } }}
              >
                <TableCell>#{item.unique_id}</TableCell>
                <TableCell>{item.student.firstname} {item.student.lastname}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={item.grade} 
                    color={item.grade >= 70 ? 'success' : 'error'}
                    sx={{ fontWeight: 'bold', minWidth: 60 }}
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

export default GradeList;
