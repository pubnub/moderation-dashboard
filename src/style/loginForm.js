import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  form: {
    padding: "35px 5px 70px 5px",
    margin: "5px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "8px",
    opacity: 1,
  },
  loginTextField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      background: "white",
      // border: "0.8326995968818665px solid #E6E6E6"
    },
    "& .MuiOutlinedInput-adornedEnd": {
      background: "white",
    },
    "& .MuiOutlinedInput-adornedStart": {
      background: "white",
    },
    opacity: 1,
  },
  textfieldIcon: {
    opacity: 0.2,
    fontSize: "21px",
  },
  maskPasswordIcon: {
    cursor: "pointer",
    opacity: 0.3,
    fontSize: "21px",
  },
  root: {
    display: "table",
    backgroundImage: "url(images/Bg.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  middle: {
    display: "table-cell",
    verticalAlign: "middle",
  },
  inner: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  logSubtitle: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 13.32px/16px var(--unnamed-font-family-proxima-nova)",
    // letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "center",
    letterSpacing: "0px",
    color: "#414141",
    opacity: 0.6,
  },
  button: {
    background: "#6387ED 0% 0% no-repeat padding-box",
    borderRadius: "8px",
    opacity: 1,
    width: "100%",
    fontWeight: "500",
    height: "49px",
    textTransform: "none",
    color: "white",
    "&:hover": {
      fontWeight: "500",
      background: "#6387ED 0% 0% no-repeat padding-box",
      color: "white",
    },
  },
  disabledButton: {
    color: "white!important",
    backgroundColor: "#9eb4f3",
  },
  logIconContainer: {
    textAlign: "center",
    margin: "0px 0px 10px 0px",
  },
  floatIcon: {
    backgroundColor: "#ecebeb",
    borderRadius: "0x 0px 0px 0px",
    padding: "0px 0px 0px 0px",
  },
  loader: {
    color: "white",
  },
});
