import React from "react";
import DiscreteSlider from "./DiscreteSlider";
import Toggle from './Toggle'
import './ControlsBox.scss'

interface Props {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  mode: boolean;
}

const ControlsBox = (props: Props) => {

  const { setMode, mode, setYear, year } = props;

  return (
  <div className="control-box">
    <Toggle setMode={setMode} mode={mode}/>
    <DiscreteSlider year={year} setYear={setYear} />
  </div>
  );
};

export default ControlsBox;
