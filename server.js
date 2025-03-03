// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { match, userQuery } = req.body;
  
  const ANALYSIS_PROMPT = `
  You are a professional sports betting analyst. Analyze this match:

  Teams: ${match.team_1} vs ${match.team_2}
  Odds:
    - ${match.team_1} Win: ${match.odds.team_1_odds}
    - Draw: ${match.odds.draw_odds}
    - ${match.team_2} Win: ${match.odds.team_2_odds}

  User Question: ${userQuery}

  Provide detailed analysis covering:
  1. Value betting opportunities
  2. Risk assessment
  3. Team form analysis
  4. Recommended bets with reasoning
  `;

  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: ANALYSIS_PROMPT
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      analysis: response.data.choices[0].message.content,
      odds: match.odds
    });
    
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));