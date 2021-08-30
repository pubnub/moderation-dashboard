import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  root: {
    backgroundColor: "white",
    boxShadow:
      "0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 1px rgb(0 0 0 / 4%), 0px 0px 0px 0px rgb(0 0 0 / 0%)",
  },
  headerMenu: {
    color: "black",
    margin: "15px",
  },
  button: {
    textTransform: "none",
    fontSize: "15px",
  },
  verticalLine: {
    marginLeft: "10px",
    marginRight: "20px",
    borderLeft: "2px solid lightgrey",
    height: "20px",
  },
});
