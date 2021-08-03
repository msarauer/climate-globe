import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    marginTop: '2rem',
    height: '300px'
  },
  mark: {
    color: 'white'
  }
});

function valuetext(value : any) {
  return `${value}`;
}

const years = [
  { value: 2005, label: 2005 },
  { value: 2010, label: 2010 },
  { value: 2016, label: 2016 },
  { value: 2017, label: 2017 },
  { value: 2018, label: 2018 },
];

interface Props {
  setYear: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  
}

export default function DiscreteSlider(props: Props) {
  const { setYear, year } = props;
  const classes = useStyles();

  const handleChange = (event: any, value: number | number[]) => {
    if (typeof value === 'number') {
      setYear(value);
    }
  };

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="on"
        step={null}
        marks={years}
        min={2005}
        max={2018}
        orientation='vertical'
        value={year}
        onChange={handleChange}
        classes={{ markLabel: classes.mark }}
      />
    </div>
  );
}