import { withStyles } from "@material-ui/core/styles";
const SwitchButton = withStyles((theme) => ({
  root: {
    width: 49,
    height: 24,
    padding: 0,
    marginLeft: "15px",
    margin: theme.spacing(0),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(23px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#6387ED",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 22,
  },
  track: {
    borderRadius: 24 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}));

export default SwitchButton;
