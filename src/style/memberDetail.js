import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  sectionHeading: {
    font: "font: var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-18)/var(--unnamed-line-spacing-23) var(--unnamed-font-family-proxima-nova)",
    color: "#414141",
    opacity: 1,
    letterSpacing: "var(--unnamed-character-spacing-0)",
    fontWeight: 700,
  },
  profilePicture: {
    width: "100%",
  },
  name: {
    fontSize: "15px",
    marginTop: "15px",
    marginBottom: "25px",
    fontWeight: 700,
    font: "font: var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-18)/var(--unnamed-line-spacing-23) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "0px",
    color: "#414141",
    opacity: 1,
  },
  label: {
    color: "#C2C2C2",
    fontSize: "15px",
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-15) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "-1px",
  },
  labelItem: {
    fontSize: "15px",
  },
  containerRoot: {
    padding: "10px",
  },
  closeIcon: {
    background: "transparent url(images/closeBg.svg) 0% 0% no-repeat padding-box;",
    padding: "12px 12px 10px 12px",
    borderRadius: "5px",
  },
  blockIcon: {
    background: "transparent url(images/greyBg.svg) 0% 0% no-repeat padding-box;",
    padding: "12px 12px 10px 12px",
    borderRadius: "5px",
  },
  online: {
    height: "10px",
    width: "10px",
    marginLeft: "2px",
    backgroundColor: "#76C00D",
    borderRadius: "50%",
    display: " inline-block",
  },
}));
