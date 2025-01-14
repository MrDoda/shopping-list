import { Paper, Typography } from '@mui/material'

export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const segmentData = payload[0].payload
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          {segmentData.name}: {segmentData.value}
        </Typography>
        {segmentData.items && segmentData.items.length > 0 ? (
          segmentData.items.map((item: string, idx: number) => (
            <Typography key={idx} variant="body2">
              - {item}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            (No items)
          </Typography>
        )}
      </Paper>
    )
  }
  return null
}
