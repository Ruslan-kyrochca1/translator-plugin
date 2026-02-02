import React from 'react'
import { Chip, Box, Typography, IconButton } from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

interface LanguageChipsProps {
  fromLanguage: string
  toLanguage: string
  onSwap?: () => void
  size?: 'small' | 'medium'
}

export const LanguageChips: React.FC<LanguageChipsProps> = ({
  fromLanguage,
  toLanguage,
  onSwap,
  size = 'small',
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip
        label={fromLanguage}
        size={size}
        sx={{
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
        }}
      />

      {onSwap ? (
        <IconButton size={size} onClick={onSwap} sx={{ p: 0.5 }}>
          <SwapHorizIcon fontSize={size} />
        </IconButton>
      ) : (
        <Typography variant="caption">→</Typography>
      )}

      <Chip
        label={toLanguage}
        size={size}
        sx={{
          bgcolor: 'secondary.light',
          color: 'secondary.contrastText',
        }}
      />
    </Box>
  )
}
