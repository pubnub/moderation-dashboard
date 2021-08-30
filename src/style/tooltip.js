import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-17) var(--unnamed-font-family-proxima-nova)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    textAlign: "left",
    color: "#414141",
    opacity: 1,
  },
}))(Tooltip);
