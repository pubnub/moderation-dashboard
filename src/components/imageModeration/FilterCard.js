import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { useStyles } from "../../style/textModeration.js";

const FilterCard = ({ state }) => {
  const classes = useStyles();
  return (
    <Grid container justify="flex-start" spacing={3}>
      <Grid item>
        <Box className={!state.initialLoading ? classes.methodSelected : classes.methodNotSelected}>
          <Grid container justify="center">
            <Box p={1}>
              <img
                alt=""
                src={
                  !state.initialLoading
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
