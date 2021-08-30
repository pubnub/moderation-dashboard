import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  button: {
    backgroundColor: "#7082e4",
    fontSize: "14px",
    padding: "5px 15px 5px 15px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  joinChannelButton: {
    transition: theme.transitions.create("width"),
    background: "#6387ED",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#6387ED",
    },
    padding: "10px 25px 10px 25px",
    height: "49px",
  },
  buttonText: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 13px/16px var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  inputBox: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: " 8px",
    opacity: 1,
    width: "100%",
  },
  loader: {
    color: "white",
  },
  modalLayout: {
    border: "1px solid #F3F3F3",
    borderRadius: "10px",
    opacity: 1,
  },
  cancelButton: {
    border: "1px solid #707070",
    borderRadius: "8px",
    opacity: 1,
    width: "140px",
    height: "45px",
  },
  avatar: {
    width: "70px",
    height: "70px",
  },
  uploadIcon: {
    bottom: "30px",
    right: "-30px",
  },
  subHeadingFont: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/16px Graphik",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#606060",
    opacity: 1,
    lineHeight: 2.5,
    paddingLeft: "12px",
  },
  headingFont: {
    font: "normal normal medium 22px/27px Proxima Nova",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#414141",
    opacity: 1,
  },
  addButton: {
    transition: theme.transitions.create("width"),
    background: "#6387ED",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#6387ED",
    },
    width: "140px",
    height: "45px",
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  addChannelButton: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #6387ED67",
    borderRadius: "5px",
    opacity: 1,
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    padding: "10px 25px 10px 25px",
    height: "49px",
  },
  addChannelButtonFont: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 13px/16px var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#6387ED",
    textTransform: "uppercase",
    opacity: 1,
  },
}));
