export interface ChartsDataInterface {
    selectedSeries: string;
    selectedScreen: string;
    allSeriesNames: string[];
    allScreens: string[];
    data: DataInterface[];
    fromToDate: Date[];
}

export interface DataInterface {
    seriesId:string;
    date:string;
    screen:string;
    views:string;
}

export interface AllChartsInterface {
    titles: string[];
    values: number[][][];
}

export interface ChartInterface {
    title: string;
    values: number[][];
    screen: string;
    allScreens: string[];
    maxValue:number;
}