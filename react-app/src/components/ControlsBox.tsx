import React from "react";
import DiscreteSlider from "./DiscreteSlider";
import Toggle from './Toggle'
import './ControlsBox.scss'

interface Props {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  mode: boolean;
}

const ControlsBox = (props: Props) => {

  const { setMode, mode } = props;

  return (
  <div className="control-box">
    <Toggle setMode={setMode} mode={mode}/>
    <DiscreteSlider />
  </div>
  );
};

export default ControlsBox;
