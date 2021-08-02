import React from "react";
import Switch from "@material-ui/core/Switch";
import Brightness3Icon from "@material-ui/icons/Brightness3"; // moon
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh"; // sun
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
// import { Brightness3Icon, BrightnessHighIcon } from "@material-ui/icons/";

interface Props {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  mode: boolean;
  
}



const useStyles = makeStyles(() => createStyles({
  root: {
    width: 60,
    height: 60,
    padding: 0,
    margin: 5
    // margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(0)",
      color: 'yellow',
      // color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#000",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#EEEEEE",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: '1px solid black',
    // border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColour: 'yellow',
    // backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: 'background-color'
    // transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}));

const Toggle = (props: Props) => {
  const classes = useStyles();
  const { setMode, mode } = props;

  const classObj = {
    root: classes.root,
    switchBase: classes.switchBase,
    thumb: classes.thumb,
    track: classes.track,
    checked: classes.checked,
  }
  return (
    <Switch
      icon={<Brightness3Icon fontSize="large" />}
      checkedIcon={<BrightnessHighIcon fontSize='large' />}
      onChange={() => setMode(!mode)}
      color="secondary"
      classes={classObj}
    />
  );
};

export default Toggle;
