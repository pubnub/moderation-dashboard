import { withStyles, makeStyles } from "@material-ui/core/styles";
export const SlideBar = withStyles({
  root: {
    color: "#6387ED",
    height: 8,
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#6387ED",
    border: "2px solid currentColor",
    marginTop: -4,
    marginLeft: -4,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
});

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  margin: {
    height: theme.spacing(3),
  },
}));
