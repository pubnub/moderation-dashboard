import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  cardRoot: {
    padding: "35px 15px 35px 15px",
  },
  root: {
    display: "table",
    position: "absolute",
    top: 0,
    left: 0,
    height: "90%",
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
});
