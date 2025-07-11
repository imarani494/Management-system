import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReferralForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

   const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(
        /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        'Invalid phone number'
      )
      .required('Phone number is required'),
    jobTitle: Yup.string().required('Job title is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      jobTitle: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('jobTitle', values.jobTitle);
        if (resumeFile) {
          formData.append('resume', resumeFile);
        }

        await axios.post(`${apiUrl}/api/candidates`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setSuccess(true);
        formik.resetForm();
        setResumeFile(null);
        setTimeout(() => navigate('/'), 2000);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      formik.setFieldError('resume', 'Only PDF files are allowed');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Refer a Candidate
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Candidate referred successfully! Redirecting to dashboard...
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Candidate Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone Number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          margin="normal"
        />
        <TextField
          fullWidth
          id="jobTitle"
          name="jobTitle"
          label="Job Title"
          value={formik.values.jobTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
          helperText={formik.touched.jobTitle && formik.errors.jobTitle}
          margin="normal"
        />
        <Box sx={{ mt: 2, mb: 3 }}>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="resume-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="resume-upload">
            <Button variant="outlined" component="span">
              Upload Resume (PDF only)
            </Button>
          </label>
          {resumeFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {resumeFile.name}
            </Typography>
          )}
          {formik.errors.resume && (
            <Typography color="error" variant="body2">
              {formik.errors.resume}
            </Typography>
          )}
        </Box>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit Referral'}
        </Button>
      </form>
    </Container>
  );
};

export default ReferralForm;