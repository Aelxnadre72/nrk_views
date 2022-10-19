import { ChartInterface } from "../interfaces/ChartsInterface";
import '../styles/Chart.css';

const Chart = (props:ChartInterface) => {

    //calculate the total views
    let values:number[] = [];
    props.values.forEach((v:number[]) => {values.push(v.reduce((currentSum, num) => currentSum + num,-1))});
    values = values.filter((v:number) => (v !== -1));

    //calulcate the unit to determine the height of the charts
    let unit:number = 63/props.maxValue;

    // handle specifically selected screen types. 
    //This code is probably why the code in Charts.tsx that 
    //is commented out outputted three duplicates of each value.
    let allScreens:string[] = props.allScreens;
    if(props.screen !== 'Alle') {
        let tempAllScreens:string[] = [];
        allScreens.forEach((s:string) => {
            tempAllScreens.push(props.screen);
        });
        allScreens = tempAllScreens;
    }

    //calculates the height of the chart unit*value
    return(<div className="chart">
        {values.map((value, index) => (
            <div key={index} className="singleChart">
                <p style={{height: '4%'}}>{value+1}</p>
                <div style={{height: (unit*value).toString() + '%', width: '1vw', backgroundColor: '#41acf2'}}></div>
                <div style={{height: '18%'}}>
                    <p>{allScreens[index]}</p>
                    <p>{props.title}</p>
                </div>
            </div>
        ))}
    </div>
    );
}; 
export default Chart;