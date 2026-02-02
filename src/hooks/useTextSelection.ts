import { useState, useCallback, useEffect } from 'react'

interface SelectionPosition {
  x: number
  y: number
}

interface UseTextSelectionResult {
  text: string
  position: SelectionPosition | null
}

const useTextSelection = (): UseTextSelectionResult => {
  const [text, setText] = useState('')
  const [position, setPosition] = useState<SelectionPosition | null>(null)

  const updateSelection = useCallback(() => {
    const selection = window.getSelection()

    if (!selection || selection.isCollapsed) {
      setText('')
      setPosition(null)
      return
    }

    const selectedText = selection.toString().trim()

    if (!selectedText) {
      setText('')
      setPosition(null)
      return
    }

    setText(selectedText)

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    if (rect.width > 0 && rect.height > 0) {
      setPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      })
    } else {
      const clientRects = range.getClientRects()
      if (clientRects.length > 0) {
        const firstRect = clientRects[0]
        setPosition({
          x: firstRect.left + window.scrollX,
          y: firstRect.top + window.scrollY,
        })
      } else {
        setPosition(null)
      }
    }
  }, [])

  useEffect(() => {
    const handleMouseUp = () => {
      updateSelection()
    }

    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [updateSelection])

  return { text, position }
}

export default useTextSelection
