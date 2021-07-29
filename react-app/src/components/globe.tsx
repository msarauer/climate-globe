import React from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";
import data from "../data/json-data1.json";

const { useEffect, useRef } = React;

interface Props {
  mode: boolean;
}

const World = (props: Props) => {
  const globeEl = useRef<any>(null);
  // const [popData, setPopData] = useState([]);
  const { mode } = props;
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
