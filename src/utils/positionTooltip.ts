export const positionTooltip = (
  selectionX: number,
  selectionY: number,
  tooltipWidth: number = 300,
  tooltipHeight: number = 200,
): { top: number; left: number } => {
  const offset = 10

  let top = selectionY + offset

  if (top + tooltipHeight > window.innerHeight) {
    top = selectionY - tooltipHeight - offset
  }

  let left = selectionX + offset * 2

  if (left + tooltipWidth > window.innerWidth) {
    left = window.innerWidth - tooltipWidth - offset
  }

  if (left < offset) {
    left = offset
  }

  return {
    top: Math.max(offset, Math.min(top, window.innerHeight - tooltipHeight - offset)),
    left: Math.max(offset, Math.min(left, window.innerWidth - tooltipWidth - offset)),
  }
}
