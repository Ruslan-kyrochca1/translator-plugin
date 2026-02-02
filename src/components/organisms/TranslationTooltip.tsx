import React from 'react'
import { Paper, Box, Typography, IconButton, Divider } from '@mui/material'
import {
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
  Translate as TranslateIcon,
} from '@mui/icons-material'
import { LanguageChips, TranslationResult } from '../molecules'

interface TranslationTooltipProps {
  position: { top: number; left: number }
  originalText: string
  translatedText: string | null
  loading: boolean
  error: string | null
  fromLanguage: string
  toLanguage: string
  onClose: () => void
  onCopy?: (text: string) => void
  onSwapLanguages?: () => void
  className?: string
  style?: React.CSSProperties
}

export const TranslationTooltip = ({
  position,
  originalText,
  translatedText,
  loading,
  error,
  fromLanguage,
  toLanguage,
  onClose,
  onCopy,
  onSwapLanguages,
  className,
  style,
}: TranslationTooltipProps) => {
  const handleCopy = () => {
    if (translatedText && onCopy) {
      onCopy(translatedText)
    }
  }

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        width: 320,
        maxWidth: '90vw',
        zIndex: 9999,
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1.5,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TranslateIcon fontSize="small" />
          <Typography variant="subtitle2" fontWeight="bold">
            Перевод
          </Typography>
        </Box>

        <LanguageChips
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          onSwap={onSwapLanguages}
        />

        <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
            Исходный текст:
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              bgcolor: 'grey.50',
              maxHeight: 80,
              overflow: 'auto',
            }}
          >
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              {originalText}
            </Typography>
          </Paper>
        </Box>

        <Divider sx={{ my: 1.5 }}>
          <TranslateIcon fontSize="small" sx={{ color: 'action.active' }} />
        </Divider>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
            Перевод:
          </Typography>

          <TranslationResult text={translatedText} loading={loading} error={error} />

          {translatedText && !loading && !error && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
              <IconButton
                size="small"
                onClick={handleCopy}
                title="Копировать перевод"
                color="primary"
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
