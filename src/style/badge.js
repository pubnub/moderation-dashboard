import { Badge, withStyles } from "@material-ui/core";

export const OnlineBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#76C00D",
    color: "#76C00D",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}))(Badge);

export const OfflineBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#C2C2C2",
    color: "#C2C2C2",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}))(Badge);
