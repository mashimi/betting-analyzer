import React from 'react';
import { Box, Typography, Chip, Grid, LinearProgress } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const AnalysisPanel = ({ match, analysis }) => {
  const chartData = [
    { name: match.team_1, value: parseFloat(analysis.probabilities.team1) },
    { name: 'Draw', value: parseFloat(analysis.probabilities.draw) },
    { name: match.team_2, value: parseFloat(analysis.probabilities.team2) },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        AI Analysis for {match.team_1} vs {match.team_2}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Probability Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <PieChart width={400} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Key Insights
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>Bookmaker Margin: {analysis.probabilities.margin}%</Typography>
            <Typography>Predicted Outcome: {analysis.prediction}</Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            Value Bets
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {analysis.valueBets.map((bet, index) => (
              <Chip key={index} label={bet} color="primary" variant="outlined" />
            ))}
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
            News Sentiment
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={analysis.news}
            sx={{ height: 10, borderRadius: 5 }}
            color={
              analysis.news > 70 ? 'success' :
              analysis.news > 40 ? 'warning' : 'error'
            }
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Positive Sentiment: {analysis.news.toFixed(1)}%
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisPanel;
