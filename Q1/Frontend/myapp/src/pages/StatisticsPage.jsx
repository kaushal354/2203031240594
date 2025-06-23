import React from 'react';
import { useUrl } from '../context/UrlContext';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Chip } from '@mui/material';

export default function StatisticsPage() {
  const { urls } = useUrl();
  return (
    <Box p={4}>
      <Typography variant="h4">URL Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map(url => (
            <TableRow key={url.shortCode}>
              <TableCell>{window.location.origin}/{url.shortCode}</TableCell>
              <TableCell>{url.longUrl}</TableCell>
              <TableCell>{url.createdAt.toLocaleString()}</TableCell>
              <TableCell>{url.expiresAt.toLocaleString()}</TableCell>
              <TableCell><Chip label={url.clicks.length} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}