import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  list: {
    width: 400,
  },
  title: {
    font: "normal normal medium 28px/38px Proxima Nova",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#414141",
    opacity: 1,
  },
  avatar: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #6387ED67",
    borderRadius: "5px",
    opacity: 1,
    height: "50px",
  },
  listText: {
    font: "var(--unnamed-font-style-normal) normal medium var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#414141",
    opacity: 1,
  },
  userType: {
    font: "var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#6387ED",
    opacity: 1,
  },
});
