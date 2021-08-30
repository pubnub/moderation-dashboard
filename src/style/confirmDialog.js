import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  confirmButton: {
    background: "#F53C56 0% 0% no-repeat padding-box",
    borderRadius: "8px",
    opacity: 1,
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#F53C56",
    },
    width: "150px",
    height: "45px",
    textTransform: "none",
  },
  cancelButton: {
    background: " #FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #172B4D",
    borderRadius: "8px",
    opacity: 1,
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    width: "100px",
    height: "45px",
  },
  confirmDialog: {
    boxShadow: "0px 3px 6px #2C28281C",
    borderRadius: "10px",
    opacity: 1,
  },
});
