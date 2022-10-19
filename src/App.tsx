import React, { useEffect, useState } from 'react';
import nrkData from './data/data.json';
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import Charts from './components/Charts';
import { ChartsDataInterface } from './interfaces/ChartsInterface';


function App() {
  const [allSeriesNamesId, setAllSeriesNamesId] = useState(['']);
  const [allScreens, setAllScreens] = useState(['']);
  const [selectedSeriesId, setSelectedSeriesId] = useState('Velg serie');
  const [selectedScreen, setSelectedScreen] = useState('Velg enhet');

  //unique dates in the database
  const [validDates, setValidDates] = useState([new Date()]);

  //start and end date
  const [startEndDate, setStartEndDate] = useState([new Date()]);
  
  //dummy data for useState
  let dummy:ChartsDataInterface = {
    selectedSeries: 'Velg serie',
    selectedScreen: 'Velg enhet', 
    allSeriesNames: ['initial'], 
    allScreens: ['initial'],
    data: [{seriesId: 'initial', date: 'initial', screen: 'initial', views: 'initial'}],
    fromToDate: [new Date()]
  }
  //const that will be given to Charts.tsx
  const [chartProps, setChartProps] = useState(dummy);

  // filter nrkData and set constants.
  useEffect(() => {
    let tempNames: string[] = ['Velg serie'];
    let tempScreens: string[] = ['Velg enhet'];
    let tempDates: string[] = [];

    tempNames = [...tempNames, 'Alle'];
    tempScreens = [...tempScreens, 'Alle'];

    // get unique seriesId's, screen sizes and dates
    nrkData.forEach(seriesData => {
      if(!tempNames.includes(seriesData.seriesId)){
        tempNames = [...tempNames, seriesData.seriesId];
      }
      if(!tempScreens.includes(seriesData.screen)){
        tempScreens = [...tempScreens, seriesData.screen];
      }
      if(!tempDates.includes(seriesData.date)){
        tempDates = [...tempDates, seriesData.date];
      }

    });

    setAllSeriesNamesId(tempNames);
    setAllScreens(tempScreens);
    tempDates.sort();

    //create Date objects from the unique dates
    let newDates:Date[] = tempDates.map((date:string) => {
      return new Date(date.substring(0,4) + "/" + date.substring(4,6) + "/" + date.substring(6,8));
    });

    setValidDates(newDates);
    setStartEndDate([newDates[0], newDates[newDates.length-1]]);
    
  }, []);

  //sets the constant that triggers rendering of Charts.tsx
  const renderCharts = (selectedSeriesId:string, selectedScreen:string, startEndDate:Date[]) => {
    if(selectedSeriesId !== 'Velg serie' && selectedScreen !== 'Velg enhet') {
      let chart:ChartsDataInterface = {
        selectedSeries: selectedSeriesId,
        selectedScreen: selectedScreen, 
        allSeriesNames: allSeriesNamesId.filter((s:string) => ( s !== 'Velg serie' && s !== 'Alle')), 
        allScreens: allScreens.filter((s:string) => ( s !== 'Velg enhet' && s !== 'Alle')),
        data: nrkData,
        fromToDate: startEndDate
      }
      setChartProps(chart);
    }
  };

  //sets dates when user selects new dates
  const onChangeDates = (dates:any) => {
    const [start, end] = dates;
    setStartEndDate([start, end]);
    renderCharts(selectedSeriesId, selectedScreen, [start, end]);
  };

  //sets seriesId when user selects new seriesId
  const onChangeSeries = (seriesId: string) => {
    setSelectedSeriesId(seriesId); 
    renderCharts(seriesId, selectedScreen, startEndDate);
  };

  //sets screen type when user selects new screen type
  const onChangeScreen = (screen: string) => {
    setSelectedScreen(screen); 
    renderCharts(selectedSeriesId, screen, startEndDate);
  };

  return (
  <div className="view">
    <div className='filter'>
    Serie:&nbsp; <select
      name="series"
      onChange={e => {onChangeSeries(e.target.value)}}
      value={selectedSeriesId}
      >
          {allSeriesNamesId.map((name, key) => (
            <option key={key} value={name}>
                {name}
            </option>
          ))}
        </select>
    &nbsp;Enhet:&nbsp; <select
      name="devices"
      onChange={e => {onChangeScreen(e.target.value)}}
      value={selectedScreen}
      >
          {allScreens.map((screen, key) => (
            <option key={key} value={screen}>
                {screen}
            </option>
          ))}
        </select>
    &nbsp;Dato:&nbsp; <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={startEndDate[0]}
      onChange={onChangeDates}
      minDate={validDates[0]}
      maxDate={validDates[validDates.length-1]}
      startDate={startEndDate[0]}
      endDate={startEndDate[1]}
      selectsRange
    />
    </div>

    <div className='chartView'>
      <Charts {...chartProps} />
    </div>
  </div>
  );
}
export default App;
