import React from "react";
import { useStyles, SlideBar } from "../../style/slideBar";
import { Slider } from "@material-ui/core";

const PrettoSlider = SlideBar(Slider);

export default function SliderComponent({ value, onChange, name }) {
  const classes = useStyles();

  const marks = [
    {
      value: 0,
      label: name === "tisane" ? "None" : 0,
    },
    {
      value: 0.25,
      label: name === "tisane" ? "Extreme" : 0.25,
    },
    {
      value: 0.5,
      label: name === "tisane" ? "High" : 0.5,
    },
    {
      value: 0.75,
      label: name === "tisane" ? "Medium" : 0.75,
    },
    {
      value: 1,
      label: name === "tisane" ? "Low" : 1,
    },
  ];

  function valuetext(values) {
    return `${values}`;
  }

  return (
    <div className={classes.root}>
      <PrettoSlider
        value={value}
        min={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={0.25}
        marks={marks}
        max={1}
        onChange={onChange}
      />
    </div>
  );
}
