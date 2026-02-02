import { useState, useCallback } from 'react'

interface TranslationResponse {
  responseData: {
    translatedText: string
  }
}

interface UseTranslateResult {
  data: string | null
  loading: boolean
  error: string | null
  translate: (text: string, fromLang: string, toLang: string) => Promise<void>
  reset: () => void
}

const useTranslate = (): UseTranslateResult => {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translate = useCallback(async (text: string, fromLang: string, toLang: string) => {
    if (!text.trim()) {
      setError('Текст для перевода не может быть пустым')
      setData(null)
      return
    }

    if (fromLang === toLang) {
      setError('Языки перевода не должны совпадать')
      setData(null)
      return
    }

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const encodedText = encodeURIComponent(text)
      const langPair = `${fromLang}|${toLang}`
      const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`)
      }

      const result: TranslationResponse = await response.json()

      if (result.responseStatus !== 200) {
        throw new Error(result.responseDetails || 'Ошибка при переводе')
      }

      setData(result.responseData.translatedText)
      setError(null)
    } catch (err) {
      console.error('Translation error:', err)
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка при переводе')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])

  return { data, loading, error, translate, reset }
}

export default useTranslate
