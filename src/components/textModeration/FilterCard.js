import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { useStyles } from "../../style/textModeration.js";

const FilterCard = ({ state, handleClick }) => {
  const classes = useStyles();
  return (
    <Grid container justify="flex-start" spacing={3}>
      <Grid item>
        <Box
          className={
            state.wordListProfanity === "true" ? classes.methodSelected : classes.methodNotSelected
          }
          onClick={handleClick("wordListMethod")}
        >
          <Grid container justify="center">
            <Box p={1}>
              <img
                alt=""
                src={
                  state.wordListProfanity === "true"
                    ? process.env.PUBLIC_URL + "/images/selected-word-list.svg"
                    : process.env.PUBLIC_URL + "/images/word-list-not-selected.svg"
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
            state.automaticProfanity === "true" ? classes.methodSelected : classes.methodNotSelected
          }
          onClick={handleClick("automaticMethod")}
        >
          <Grid container justify="center">
            <Box p={1}>
              <img
                alt=""
                src={
                  state.automaticProfanity === "true"
                    ? process.env.PUBLIC_URL + "/images/automatic-profanity-selected.svg"
                    : process.env.PUBLIC_URL + "/images/automatic-detection.svg"
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
