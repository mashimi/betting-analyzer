import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const MatchList = ({ matches, onSelect, selectedMatch }) => (
  <Paper elevation={2}>
    <Typography variant="h6" sx={{ p: 2 }}>
      Uploaded Matches
    </Typography>
    <List sx={{ maxHeight: 400, overflow: 'auto' }}>
      {matches.map((match, index) => (
        <ListItem
          button
          key={index}
          selected={selectedMatch === match}
          onClick={() => onSelect(match)}
        >
          <ListItemText
            primary={`${match.team_1} vs ${match.team_2}`}
            secondary={new Date(match.match_date).toLocaleDateString()}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default MatchList;
