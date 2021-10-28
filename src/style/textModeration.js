import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    font: "var(--unnamed-font-style-normal) normal medium var(--unnamed-font-size-26)/var(--unnamed-line-spacing-31) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "#414141",
    fontSize: "20px",
    // paddingLeft: '20px',
    // fontWeight: 600,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    // padding:"3px",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    border: "1px solid #e8eaf6",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  searchInput: {
    background: " #FFFFFF 0% 0% no-repeat padding-box",

    borderRadius: "5px",
    opacity: 1,
  },

  labelStyle: {
    color: "#606060",
  },

  methodNotSelected: {
    background: "white",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000014",
    border: "0px solid #6387ED",
    borderRadius: "10px",
    color: "black",
    opacity: 1,
    padding: "20px 0px 20px 0px",
    width: "170px",
  },
  methodSelected: {
    background: "#E7EDFF 0% 0% no-repeat padding-box",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000014",
    border: "1px solid #6387ED",
    borderRadius: "10px",
    color: "#6387ED",
    opacity: 1,
    padding: "20px 0px 20px 0px",
    width: "170px",
  },

  profanityCardRoot: {
    padding: "20px",
  },

  cancelButton: {
    width: "150px",
    margin: "3px",
    height: "37px",
    boxShadow: "0px 0px 0px white",
    backgroundColor: "white",
    border: "1px solid #707070",
    borderRadius: "8px",
    opacity: 1,
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 13px/16px var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "#707070",
    fontSize: "13px",
  },
  saveButton: {
    background: "#6387ED 0% 0% no-repeat padding-box",
    borderRadius: "8px",
    opacity: 1,
    color: "white",
    width: "150px",
    margin: "8px",
    height: "37px",
    fontSize: "13px",
    "&:hover": {
      background: "#6387ED 0% 0% no-repeat padding-box",
      color: "white",
    },
  },
  addButton: {
    fontSize: "17px",
  },
  addButtonContainer: {
    marginTop: "3px",
    background: "#E7EDFF",
    color: "#6387ED",
    opacity: 1,
    "&:hover": {
      background: "#E7EDFF",
      color: "#6387ED",
    },
  },
  defaultText: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textDecoration: "underline",
    color: "#6387ED",
    cursor: "pointer",
    opacity: 1,
    "&:hover": {
      background: "#E7EDFF",
      color: "#6387ED",
    },
  },

  loader: {
    marginRight: "5px",
  },
  reroute: {
    textTransform: "none",
    marginLeft: "8px",
    backgroundColor: "#FCF0EF",
    color: "#FB6340",
    marginTop: "5px",
  },
  subTitle: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-18)/var(--unnamed-line-spacing-23) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#606060",
    opacity: 1,
    paddingBottom: "12px",
  },
  infoIcon: {
    padding: "3px 0px 0px 5px",
  },
}));
