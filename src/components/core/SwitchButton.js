import Switch from "@material-ui/core/Switch";
import SwitchButtonStyle from "../../style/switchButton";

const SwitchButton = SwitchButtonStyle(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default SwitchButton;
