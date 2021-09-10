import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  Avatar,
  Box,
  Divider,
  MenuList,
} from "@material-ui/core";
import { KeyboardArrowDownOutlined } from "@material-ui/icons";
import { useStyles } from "../../../style/myAccountDropdown";
import { signout } from "../../../services/localStorage";
import AccountList from "../../accounts/AccountList";
import { capitalizeFirstCharacter, selectedAccountsFromLS } from "../../../utils/helpers";

export default function MyAccountDropdown({ accounts }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);
  const anchorRef = useRef(null);
  const history = useHistory();

  const handleToggle = () => {
    setOpen((prevOpenState) => !prevOpenState);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          className={classes.button}
          endIcon={<KeyboardArrowDownOutlined />}
          onClick={handleToggle}
        >
          <Avatar className={classes.avatar} variant="square">
            {capitalizeFirstCharacter(selectedAccountsFromLS().email.slice(0, 2))}
          </Avatar>
          {selectedAccountsFromLS().email}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          className={classes.paperRoot}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <AccountList accounts={accounts} />
                    <Box pl={2} pr={2}>
                      <Divider />
                    </Box>
                    <MenuItem onClick={() => signout(() => history.push("/"))}>
                      <img src={process.env.PUBLIC_URL + "/images/sign-out.svg"} alt="Signout" />
                      <Box pl={1}>
                        <small>Logout</small>
                      </Box>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
