import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { useStyles } from '../../style/textModeration.js';

const FilterCard = ({ state, handleClick }) => {
  const classes = useStyles();
  return (
    <Grid container justify="flex-start" spacing={3}>
      <Grid item>
        <Box
          className={
            state.wordListProfanity === 'true'
              ? classes.methodSelected
              : classes.methodNotSelected
          }
          onClick={handleClick('wordListMethod')}
        >
          <Grid container justify="center">
            <Box p={1}>
              <img
                alt=""
                src={
                  state.wordListProfanity === 'true'
                    ? '/images/selected-word-list.svg'
                    : '/images/word-list-not-selected.svg'
                }
              />
            </Box>
          </Grid>
          <Typography variant="body1" align="center">
            Word List
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          className={
            state.automaticProfanity === 'true'
              ? classes.methodSelected
              : classes.methodNotSelected
          }
          onClick={handleClick('automaticMethod')}
        >
          <Grid container justify="center">
            <Box p={1}>
              <img
                alt=""
                src={
                  state.automaticProfanity === 'true'
                    ? '/images/automatic-profanity-selected.svg'
                    : '/images/automatic-detection.svg'
                }
              />
            </Box>
          </Grid>
          <Typography testid="autoDetection" variant="body1" align="center">
            Automatic Detection
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FilterCard;
