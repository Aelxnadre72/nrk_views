import { AllChartsInterface, ChartInterface, ChartsDataInterface } from "../interfaces/ChartsInterface";
import Chart from "./Chart";
import '../styles/Charts.css';

const Charts = (props:ChartsDataInterface) => {
    
    //in the beginning, if at least one of the drop downs has not been changed from 'Velg..'
    if(props.selectedSeries === 'Velg serie' || props.selectedScreen === 'Velg enhet') {
        return <p>Velg serie og enhet</p>;
    }

    let chartData:AllChartsInterface = {
        titles: ['initial'],
        values: [[[-1]]]
    }

    // initialize maxValue, which is the highest number of views within the chosen dates
    let maxValue:number = 0;

    // converts to YYYYMMdd, this format works with sort()
    const toNum = (date:Date) => {
        return parseInt(date.toLocaleDateString('fr-CA').replaceAll('-', ''));
    }

    //trigger rendering of Chart.tsx
    const changeChart = (titles:string[], values:number[][][]) => {
        let tempChartData:AllChartsInterface = {
            titles: titles,
            values: values
        }

        chartData = tempChartData;
    }

    //if only the start date has been chosen
    if(props.fromToDate[1] === null) {
        return(<p>Velg sluttdato</p>);
    }

    let tempChartValues:number[][][] = [];
    let tempTitles:string[] = [];

    //if 'Alle' series is selected
    if(props.selectedSeries === 'Alle') {
        for(let i:number = 0; i<props.allSeriesNames.length; i++){
            tempChartValues.push([]);
            for(let j:number = 0; j<props.allScreens.length; j++){
                tempChartValues[i].push([]);
            }
        }

        //if 'Alle' screen types is selected
        if(props.selectedScreen === 'Alle') {
            (props.data).forEach((seriesData) => {
                if(parseInt(seriesData.date) >= toNum(props.fromToDate[0]) && parseInt(seriesData.date) <= toNum(props.fromToDate[1])){
                    tempChartValues[props.allSeriesNames.indexOf(seriesData.seriesId)][props.allScreens.indexOf(seriesData.screen)].push(parseInt(seriesData.views));
                }
            });
        }
        //if a specific screen type is selected
        else {
            (props.data).forEach((seriesData) => {
                if(seriesData.screen === props.selectedScreen && parseInt(seriesData.date) >= toNum(props.fromToDate[0]) && parseInt(seriesData.date) <= toNum(props.fromToDate[1])){
                    tempChartValues[props.allSeriesNames.indexOf(seriesData.seriesId)][props.allScreens.indexOf(seriesData.screen)].push(parseInt(seriesData.views));
                }
            });
        }

        tempTitles = props.allSeriesNames;
    }
    // if a specific series is selected. Does render some charts, however, mostly incomplete sets
    /*
    else {
        let tempDates:string[] = [];

        if(props.selectedScreen === 'Alle') {
            (props.data).forEach((seriesData) => {
                if(!(tempDates.includes(seriesData.date) && seriesData.seriesId === props.selectedSeries && parseInt(seriesData.date) >= toNum(props.fromToDate[0]) && parseInt(seriesData.date) <= toNum(props.fromToDate[1]))){
                    tempDates.push(seriesData.date);
                }
            });
            tempDates.sort();
    
            for(let i:number = 0; i<tempDates.length; i++){
                tempChartValues.push([]);
                for(let j:number = 0; j<props.allScreens.length; j++){
                    tempChartValues[i].push([]);
                }
            }

            (props.data).forEach((seriesData) => {
                if(seriesData.seriesId === props.selectedSeries && parseInt(seriesData.date) >= toNum(props.fromToDate[0]) && parseInt(seriesData.date) <= toNum(props.fromToDate[1])){
                    tempChartValues[tempDates.indexOf(seriesData.date)][props.allScreens.indexOf(seriesData.screen)].push(parseInt(seriesData.views));
                }
            });
        }
        else {
            (props.data).forEach((seriesData) => {
                if(!(tempDates.includes(seriesData.date) && seriesData.seriesId === props.selectedSeries && seriesData.screen === props.selectedScreen && parseInt(seriesData.date) >= toNum(props.fromToDate[0]) && parseInt(seriesData.date) <= toNum(props.fromToDate[1]))){
                    tempDates.push(seriesData.date);
                }
            });
            tempDates.sort();
    
            for(let i:number = 0; i<tempDates.length; i++){
                tempChartValues.push([]);
                for(let j:number = 0; j<props.allScreens.length; j++){
                    tempChartValues[i].push([]);
                }
            }

            console.log("gikk inn i IKKE alle");
            (props.data).forEach((seriesData) => {
                if(seriesData.seriesId === props.selectedSeries && seriesData.screen === props.selectedScreen && parseInt(seriesData.date) >= toNum(props.fromToDate[0]) && parseInt(seriesData.date) <= toNum(props.fromToDate[1])){
                    tempChartValues[tempDates.indexOf(seriesData.date)][props.allScreens.indexOf(seriesData.screen)].push(parseInt(seriesData.views));
                }
            });
        }
        tempTitles = tempDates.map((d:string) => {
            return (d.substring(6,8) + '/' + d.substring(4,6) + "/" + d.substring(0,4));
        });
    }
    */

    // find highest number of views, result depends on the selected filter (serie, enhet, dato) - as mentioend earlier, 'serie' only works with 'Alle' for the time being
    let values:number[] = [];
    tempChartValues.forEach((v:number[][]) => {v.forEach((w:number[]) => {values.push(w.reduce((currentSum, num) => currentSum + num,-1))})});
    values = values.filter((v:number) => (v !== -1));
    maxValue = Math.max(...values); //maxValue is used to set the unit for the charts.

    changeChart(tempTitles, tempChartValues);

    return(
    <div className="charts">
        {chartData.titles.map((title, key) => (
            <Chart key={key} {...{title:title, values:chartData.values[chartData.titles.indexOf(title)], screen:props.selectedScreen, allScreens:props.allScreens, maxValue:maxValue}}/>
        ))}
    </div>
    );
}; 
export default Charts;