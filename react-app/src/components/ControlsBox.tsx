import React, { useEffect, useState} from "react";
import DiscreteSlider from "./DiscreteSlider";
import Toggle from './Toggle'
import DataDialog from "./DataDialog";
import './ControlsBox.scss';
import axios from 'axios';

interface Props {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  mode: boolean;
}

const initialDialogData = [
  {
    buttonLabel: "Carbon Dioxide Chart",
    dialogTitle: "Global Average Carbon Dioxide Levels",
    dialogText: `Carbon dioxide, is an organic compound consisting of one carbon atom and two oxygen atoms - CO2
         Carbon dioxide is a natural occuring substance and is consumed by plants through photosynthesis.  It is also created through combustion of
         organic matter with oxygen.`,
    data: [],
  },
  {
    buttonLabel: "Nitrous Oxide Chart",
    dialogTitle: "Global Average Nitrous Oxide Levels",
    dialogText: `Nitrous Oxide, also known as nos, is a result of combustion and consists of two nitrogen atoms and one oxygen atom - N2O.
         Nitrous oxide is a green house gas as well as "the biggest ozone-destroying compound emitted by humans" (*2).`,
    data: [],
  },
  {
    buttonLabel: "Temperature Chart",
    dialogTitle: "Global Average Temperature Anomolies",
    dialogText: `Temperature, also known as heat, consisting of hot stuff, I R PROGRAMMER.`,
    data: [],
  },
  {
    buttonLabel: "Methane Chart",
    dialogTitle: "Global Average Methane Levels",
    dialogText: `Methane, also known as Natural Gas, is an organic compound consisting of one carbon atom and four hydrogen atoms - CH4
         The greenhouse effect of methane is several times stronger than that of carbon dioxide (*1).  Sources of methane are both
         natural and human-made.`,
    data: [],
  },
];


const ControlsBox = (props: Props) => {

  const { setMode, mode, setYear, year } = props;
  const [methane, setMethane] = useState([]);
  const [co2, setCo2] = useState([]);
  const [nitrous, setNitrous] = useState([]);
  const [temp, setTemp] = useState([]);
  const [dialogData, setDialogData] = useState(initialDialogData)

  useEffect(() => {
    Promise.all([
    axios.get('https://global-warming.org/api/temperature-api'),
    axios.get('https://global-warming.org/api/co2-api'),
    axios.get('https://global-warming.org/api/methane-api'),
    axios.get('https://global-warming.org/api/nitrous-oxide-api')])
    .then((all)=>{
      console.log(all)
      setTemp(all[0].data.result.map((x: any) => ({ val: x.station, name: Number(x.time.split('.')[0]) })));
      // setCo2(all[1].data.co2.map((x: any) => ({ val: x.cycle, name: new Date(`${x.year}-${x.month}-${x.day}`)})));
      // setCo2(all[1].data.co2.map((x: any) => ({ val: x.cycle, name: Math.round((Number(x.year) + Number(x.month) / 12 + Number(x.day) / (12 * 31)) * 100) / 100 })));
      setCo2(all[1].data.co2.map((x: any) => ({ val: x.cycle, name: Number(x.year) })));
      setMethane(all[2].data.methane.map((x: any) => ({ val: x.average, name: Number(x.date.split('.')[0]) })));
      setNitrous(all[3].data.nitrous.map((x: any) => ({ val: x.average, name: Number(x.date.split('.')[0]) })));
    });
  }, []);

useEffect(()=>{
  setDialogData([
    {
      buttonLabel: "Carbon Dioxide Chart",
      dialogTitle: "Global Average Carbon Dioxide Levels",
      dialogText: `Carbon dioxide, is an organic compound consisting of one carbon atom and two oxygen atoms - CO2
         Carbon dioxide is a natural occuring substance and is consumed by plants through photosynthesis.  It is also created through combustion of
         organic matter with oxygen.`,
      data: co2
    },
    {
      buttonLabel: "Nitrous Oxide Chart",
      dialogTitle: "Global Average Nitrous Oxide Levels",
      dialogText: `Nitrous Oxide, also known as nos, is a result of combustion and consists of two nitrogen atoms and one oxygen atom - N2O.
         Nitrous oxide is a green house gas as well as "the biggest ozone-destroying compound emitted by humans" (*2).`,
      data: nitrous,
    },
    {
      buttonLabel: "Temperature Chart",
      dialogTitle: "Global Temperature Anomolies Levels",
      dialogText: `Temperature, also known as heat, consisting of hot stuff, I R PROGRAMMER.`,
      data: temp,
    },
    {
      buttonLabel: "Methane Chart",
      dialogTitle: "Global Average Methane Levels",
      dialogText: `Methane, also known as Natural Gas, is an organic compound consisting of one carbon atom and four hydrogen atoms - CH4
         The greenhouse effect of methane is several times stronger than that of carbon dioxide (*1).  Sources of methane are both
         natural and human-made.`,
      data: methane,
    },
  ])
},[temp, co2, methane, nitrous]);

  

  const dialogs = dialogData.map(d => <DataDialog {...d} key={d.dialogTitle} />)

  return (
  <div className="control-box">
    <Toggle setMode={setMode} mode={mode}/>
    <DiscreteSlider year={year} setYear={setYear} />
    {dialogs}
  </div>
  );
};

export default ControlsBox;
