import React from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';


const { useState, useEffect, useRef } = React;

const World = () => {
    const globeEl = useRef<any>(null);
    const [popData, setPopData] = useState([]);


    // useEffect(() => {
    //   // load data
    //   fetch('../datasets/world_population.csv').then(res => res.text())
    //     .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
    //     .then(setPopData);
    // }, []);

  useEffect(() => {
    // Auto-rotate
      if(null !== globeEl.current) {
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 1;

      }
  }, []);

    const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
      .domain([0, 1e7]);

    return <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

      hexBinPointsData={popData}
      hexBinPointWeight="pop"
      hexAltitude={d => d.sumWeight * 6e-8}
      hexBinResolution={4}
      hexTopColor={d => weightColor(d.sumWeight)}
      hexSideColor={d => weightColor(d.sumWeight)}
      hexBinMerge={true}
      enablePointerInteraction={false}
    />;
  };

  export default World;