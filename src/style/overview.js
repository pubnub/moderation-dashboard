import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridOne: {
    padding: theme.spacing(2),
    opacity: 1,
    borderRadius: "10px",
    border: "1px solid #F3F3F3",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 6px #00000014",
    height: "100%",
  },
  gridTwo: {
    padding: theme.spacing(2),
    opacity: 1,
    borderRadius: "10px",
    border: "1px solid #F3F3F3",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 6px #00000014",
    height: "100%",
  },
  headings: {
    textAlign: "left",
    opacity: 1,
    color: "#C2C2C2",
    textTransform: "uppercase",
    font: "var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-12)/var(--unnamed-line-spacing-15) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
  },
  values: {
    color: "#414141",
    textAlign: "left",
    opacity: 1,
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-18)/var(--unnamed-line-spacing-23) var(--unnamed-font-family-proxima-nova)",
  },
  avatar: {
    background: "#FCF0EF",
    color: "#E66E68",
    borderRadius: "8px",
  },
  test: {
    text: "ellipsis",
  },
  appName: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    fontSize: "12px",
    color: "#C2C2C2",
    opacity: 1,
  },
}));
