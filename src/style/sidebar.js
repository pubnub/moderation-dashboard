import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 220;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "10px",
  },
  textModerationIcon: {
    color: "#00e676",
  },
  overviewIcon: {
    color: "#673ab7",
  },
  channelIcon: {
    color: "#e91e63",
  },
  settingsIcon: {
    color: "#f44336",
  },
  chatIcon: {
    color: "#ffc400",
  },
  userIcon: {
    color: "#00e5ff",
  },
  drawer: {
    [theme.breakpoints.up("xs")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  listItemRoot: {
    minWidth: "40px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
