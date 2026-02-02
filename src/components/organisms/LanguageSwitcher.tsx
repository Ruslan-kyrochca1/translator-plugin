import React from 'react'
import { Box, Select, MenuItem, IconButton, FormControl, Typography } from '@mui/material'

export interface Language {
  code: string
  name: string
  flag?: string
}

interface LanguageSwitcherProps {
  fromLanguage: string
  toLanguage: string
  languages: Language[]
  onChange: (from: string, to: string) => void
  disabled?: boolean
}

export const LanguageSwitcher = ({
  fromLanguage,
  toLanguage,
  languages,
  onChange,
  disabled = false,
}: LanguageSwitcherProps) => {
  const handleFromChange = (event: any) => {
    const newFrom = event.target.value as string

    if (newFrom === toLanguage) {
      onChange(toLanguage, fromLanguage)
    } else {
      onChange(newFrom, toLanguage)
    }
  }

  const handleToChange = (event: any) => {
    const newTo = event.target.value as string

    if (newTo === fromLanguage) {
      onChange(toLanguage, fromLanguage)
    } else {
      onChange(fromLanguage, newTo)
    }
  }

  const handleSwap = () => {
    onChange(toLanguage, fromLanguage)
  }

  const getLanguageName = (code: string) => {
    const lang = languages.find((l) => l.code === code)
    return lang ? lang.name : code.toUpperCase()
  }

  const getLanguageFlag = (code: string) => {
    const lang = languages.find((l) => l.code === code)
    return lang?.flag || '🏳️'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
          Из:
        </Typography>
        <Select
          value={fromLanguage}
          onChange={handleFromChange}
          disabled={disabled}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{getLanguageFlag(value as string)}</span>
              <span>{getLanguageName(value as string)}</span>
            </Box>
          )}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code} disabled={lang.code === toLanguage}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{lang.flag || '🏳️'}</span>
                <span>
                  {lang.name} ({lang.code.toUpperCase()})
                </span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton
        onClick={handleSwap}
        disabled={disabled}
        sx={{
          color: 'primary.main',
          '&:hover': { bgcolor: 'primary.50' },
        }}
        title="Поменять языки местами"
      >
        ↔
      </IconButton>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
          В:
        </Typography>
        <Select
          value={toLanguage}
          onChange={handleToChange}
          disabled={disabled}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{getLanguageFlag(value as string)}</span>
              <span>{getLanguageName(value as string)}</span>
            </Box>
          )}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code} disabled={lang.code === fromLanguage}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{lang.flag || '🏳️'}</span>
                <span>
                  {lang.name} ({lang.code.toUpperCase()})
                </span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
