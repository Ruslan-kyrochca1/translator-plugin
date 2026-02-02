import React from 'react'
import { Paper, Typography, Box, CircularProgress } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface TranslationResultProps {
  text: string | null
  loading: boolean
  error: string | null
}

export const TranslationResult: React.FC<TranslationResultProps> = ({ text, loading, error }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
        <CircularProgress size={32} />
        <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
          Перевод...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'error.light',
          borderColor: 'error.main',
        }}
      >
        <ErrorOutlineIcon color="error" />
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Paper>
    )
  }

  if (text) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          bgcolor: 'success.light',
          borderColor: 'success.main',
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Paper>
    )
  }

  return null
}
