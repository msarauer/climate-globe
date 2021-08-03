import React from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";
import data2005 from "../data/json-data2005.json";
import data2010 from "../data/json-data2010.json";
import data2016 from "../data/json-data2016.json";
import data2017 from "../data/json-data2017.json";
import data2018 from "../data/json-data2018.json";


const { useEffect, useRef } = React;

interface Props {
  mode: boolean;
  year: number;
}

const World = (props: Props) => {
  const globeEl = useRef<any>(null);
  const { mode,year } = props;

  let data: (string | number | null)[][];
  switch (year) {
    case 2005:
      data = data2005;
      break;
    case 2010:
      data = data2010;
      break;
    case 2016:
      data = data2016;
      break;
    case 2017:
      data = data2017
      break;
    default:
      data = data2018;
      break;
  }
  
  const objData = data.map((d) => ({
    lat: d[1],
    lng: d[2],
    temp: d[4],
  }));
  console.log(objData);

  useEffect(() => {
    // setPopData(data);
    // console.log("popData:", popData);
    //   // load data
    //   // fetch('./data/json-data1.json').then(res => res.text())
    //     d3.json(data, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
    //     .then(setPopData);
  }, []);

  useEffect(() => {
    // Auto-rotate
    if (null !== globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1;
    }
  }, []);

  const weightColor = d3
    .scaleSequentialSqrt(d3.interpolateRdYlBu)
    .domain([90, 50]);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={
        mode
          ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
          : "//unpkg.com/three-globe/example/img/earth-day.jpg"
      }
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      hexBinPointsData={objData}
      hexBinPointWeight="temp"
      hexAltitude={(d) => d.sumWeight * 0.002}
      hexBinResolution={4}
      hexTopColor={(d) => weightColor(d.sumWeight)}
      hexSideColor={(d) => weightColor(d.sumWeight)}
      hexBinMerge={true}
      enablePointerInteraction={false}
    />
  );
};

export default World;
