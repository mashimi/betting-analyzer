// App.js
import React, { useState } from 'react';
import { Box, Container, Typography, Paper, LinearProgress } from '@mui/material';
import FileUpload from './components/FileUpload';
import MatchList from './components/MatchList';
import AnalysisPanel from './components/AnalysisPanel';

function App() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setMatches(data[0].matches);
      } catch (error) {
        alert('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
  };

  const analyzeMatch = (match) => {
    setIsAnalyzing(true);
    setSelectedMatch(match);
    
    // Simulated AI analysis (replace with actual API call)
    setTimeout(() => {
      const probabilities = calculateProbabilities(match.odds);
      const valueBets = findValueBets(match.odds, probabilities);
      const prediction = predictOutcome(match);
      
      setAnalysis({
        probabilities,
        valueBets,
        prediction,
        news: analyzeNewsSentiment(match)
      });
      setIsAnalyzing(false);
    }, 1000);
  };

  const calculateProbabilities = (odds) => {
    const total = 1/odds.team_1_odds + 1/odds.team_2_odds + 1/odds.draw_odds;
    return {
      team1: (1/odds.team_1_odds / total * 100).toFixed(1),
      team2: (1/odds.team_2_odds / total * 100).toFixed(1),
      draw: (1/odds.draw_odds / total * 100).toFixed(1),
      margin: ((total - 1) * 100).toFixed(2)
    };
  };

  const findValueBets = (odds, probabilities) => {
    const valueBets = [];
    if (probabilities.team1 > 50) valueBets.push('Home Win');
    if (probabilities.team2 > 40) valueBets.push('Away Win');
    if (probabilities.draw > 30) valueBets.push('Draw');
    return valueBets.length ? valueBets : ['No Clear Value'];
  };

  const predictOutcome = (match) => {
    // Simplified prediction logic
    const odds = match.odds;
    if (odds.team_1_odds < 1.5) return match.team_1;
    if (odds.team_2_odds < 2.0) return match.team_2;
    return 'Draw';
  };

  const analyzeNewsSentiment = () => {
    // Mock sentiment analysis
    return Math.random() * 100;
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom>
          AI Betting Analyzer
        </Typography>
        
        <FileUpload onUpload={handleFileUpload} />
        
        {matches.length > 0 && (
          <Box mt={4}>
            <MatchList 
              matches={matches} 
              onSelect={analyzeMatch}
              selectedMatch={selectedMatch}
            />
          </Box>
        )}
        
        {selectedMatch && (
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            {isAnalyzing ? (
              <Box textAlign="center">
                <LinearProgress />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Analyzing match...
                </Typography>
              </Box>
            ) : analysis && (
              <AnalysisPanel 
                match={selectedMatch}
                analysis={analysis}
              />
            )}
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App;
