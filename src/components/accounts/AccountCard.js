import React from "react";
import { MenuItem, Avatar, Grid, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useStyles } from "../../style/accountCard";
import { capitalizeFirstCharacter, avatarStyle, selectedAccountsFromLS } from "../../utils/helpers";

const AccountCard = ({ account, handleClick, index }) => {
  const classes = useStyles();

  return (
    <>
      <MenuItem testid={`${index}`} onClick={() => handleClick(account)}>
        <Grid container>
          <Grid item xs={2} sm={2}>
            <Avatar className={classes.avatar} style={avatarStyle(index)} variant="square">
              <Typography testid="capitalChar" className={classes.avatarText}>
                {account && account.email
                  ? capitalizeFirstCharacter(account.email.slice(0, 2))
                  : null}
              </Typography>
            </Avatar>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography testid="email" noWrap className={classes.email}>
              {account.email}
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1}>
            <CheckCircleIcon
              style={avatarStyle(account.email, selectedAccountsFromLS)}
              className={classes.checkIcon}
            />
          </Grid>
        </Grid>
      </MenuItem>
    </>
  );
};

export default AccountCard;
