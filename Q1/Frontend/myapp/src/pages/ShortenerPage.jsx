import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Snackbar, Alert } from '@mui/material';
import { useUrl } from '../context/UrlContext';
import { isValidUrl, isValidShortcode } from '../utils/validation';

export default function ShortenerPage() {
  const { addUrl } = useUrl();
  const [longUrl, setLongUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState(30);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!isValidUrl(longUrl)) return setError('Invalid URL format');
    if (shortcode && !isValidShortcode(shortcode)) return setError('Invalid shortcode');
    if (!addUrl(longUrl, shortcode, validity)) return setError('Shortcode already exists');

    setSuccess(true);
    setLongUrl('');
    setShortcode('');
    setValidity(30);
  };

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={12}><Typography variant="h4">URL Shortener</Typography></Grid>
      <Grid item xs={12}><TextField fullWidth label="Long URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} /></Grid>
      <Grid item xs={12}><TextField fullWidth label="Custom Shortcode (optional)" value={shortcode} onChange={(e) => setShortcode(e.target.value)} /></Grid>
      <Grid item xs={12}><TextField fullWidth label="Validity (minutes)" type="number" value={validity} onChange={(e) => setValidity(parseInt(e.target.value))} /></Grid>
      <Grid item xs={12}><Button variant="contained" onClick={handleSubmit}>Shorten</Button></Grid>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}><Alert severity="error">{error}</Alert></Snackbar>
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}><Alert severity="success">Shortened!</Alert></Snackbar>
    </Grid>
  );
}
