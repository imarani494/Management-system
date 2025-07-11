import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

 const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`https://management-system-1-ptw5.onrender.com/api/candidates`, {
          params: {
            jobTitle: searchTerm,
            status: statusFilter
          }
        });
        setCandidates(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [searchTerm, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://management-system-1-ptw5.onrender.com/api/candidates/${id}/status`, {
        status: newStatus
      });
      setCandidates(candidates.map(candidate =>
        candidate._id === id ? { ...candidate, status: newStatus } : candidate
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Candidate Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/refer"
        >
          Refer a Candidate
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Search by Job Title"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Reviewed">Reviewed</MenuItem>
            <MenuItem value="Hired">Hired</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {candidates.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No candidates found. Try adjusting your search filters.
          </Typography>
        ) : (
          candidates.map((candidate) => (
            <Grid item xs={12} sm={6} md={4} key={candidate._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {candidate.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                    {candidate.jobTitle}
                  </Typography>
                  <Typography variant="body2">
                    Email: {candidate.email}
                  </Typography>
                  <Typography variant="body2">
                    Phone: {candidate.phone}
                  </Typography>
                  {candidate.resumeUrl && (
                    <Typography variant="body2">
                      <a
                        href={`https://management-system-1-ptw5.onrender.com/${candidate.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </Typography>
                  )}
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      Status:
                    </Typography>
                    <Select
                      size="small"
                      value={candidate.status}
                      onChange={(e) =>
                        handleStatusChange(candidate._id, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Reviewed">Reviewed</MenuItem>
                      <MenuItem value="Hired">Hired</MenuItem>
                    </Select>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;