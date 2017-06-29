import {
  select,
  Selection,
  BaseType
} from 'd3-selection';
import {
  scaleOrdinal,
  ScaleOrdinal
} from 'd3-scale';
import {
  arc,
  pie,
  Arc,
  Pie,
  DefaultArcObject,
  PieArcDatum
} from 'd3-shape'
import "d3-transition";



export interface IPlotOptions {

  innerRadius ? : boolean | number;
  startAngle ? : number;
  cornerAngle ? : boolean | number ;

}

export interface IPieChartConfig {

  container?: string;
  colors?: string[];
  series: Series;
  plotOptions ? : IPlotOptions


}

export interface IPieChartDimensions {

  width: number;
  height: number;
  radius: number;
  innerRadius: number;
  startAngle: number;
  cornerAngle: number;


}

export interface Datum {
  name: string;
  score: number;
}
export type dataJoin = Selection<BaseType, SeriesDatum, BaseType, undefined>

export type d3Selection = Selection < BaseType, {}, HTMLElement, undefined > ;

export interface IChartSelections {

  svgContainer: d3Selection;
  arc: Arc < any, Datum > ;
  pie: Pie < any, number | {
    valueOf(): number;
  } > ;
  pieContainer: d3Selection;


}


export type Series = Array < {
  data: Array < {
    score: number;
    name: string;
  } >
} > ;

export type SeriesDatum = PieArcDatum < number | {
    valueOf(): number;
  } > [] ;

export class PieChart {


  _container: d3Selection;
  _series: Series;
  _colorScale: ScaleOrdinal < string, string > ;
  _chartDimensions: IPieChartDimensions = {
    width: null,
    height: null,
    radius: null,
    innerRadius: 0,
    startAngle: 0,
    cornerAngle: 0
  };
  _selections: IChartSelections = {
    svgContainer: null,
    arc: null,
    pie: null,
    pieContainer: null
  };
  instanceUniqueId: string = 'myInstance';



  /**
   *
   */
  constructor(config: IPieChartConfig) {
    this.initializeConfig(config);
    this.initializeSvg();
    this.createPieContainer();

    this.render();

  }

  initializeConfig(chartConfig: IPieChartConfig) {
    //config destructiorung
    let {
      series,
      container,
      colors,
      plotOptions,
      ...remaining
    } = chartConfig;

    this.setContainer(container);
    this.setSeries(series);
    this.setColors(colors);
    this.applyPlotOptions(plotOptions);

  }

  createPieContainer() {
    let pieContainer = this._selections.svgContainer.append('g');
    pieContainer.attr("transform",
      ` translate(  ${this._chartDimensions.width / 2}  ,  ${this._chartDimensions.height / 2} )`
    );

    this._selections.pieContainer = pieContainer;

  }

  applyPlotOptions(plotOptions: IPlotOptions) {

    if (plotOptions) {
      let {
        innerRadius,
        startAngle,
        cornerAngle
      } = plotOptions;

      this._chartDimensions.innerRadius = this.setRadius(innerRadius);
      this._chartDimensions.cornerAngle =  this.setRadius(cornerAngle);
      this.setStartAngle(startAngle)
    }


  }

  setRadius(innerRadius: boolean | number) {
    if (innerRadius) {
      if (typeof (innerRadius) === 'boolean') {
        return  this._chartDimensions.radius / 2;
      } else if (typeof (innerRadius) === "number") {
        return innerRadius;
      }

    }else{
        return 0;
      }
  }

  setStartAngle(startAngle: number) {
    if (startAngle) {
      this._chartDimensions.startAngle = startAngle;
    }
  }

  setContainer(containerQuerySelector: string) {
    let containerSelection = select(containerQuerySelector);
    this._container = containerSelection;
    this.setChartDimensions(containerSelection);

  }

  setChartDimensions(container: d3Selection) {
    let height = parseInt(container.style("height"));
    let width = parseInt(container.style("width"))

    this._chartDimensions.height = height;
    this._chartDimensions.width = width;
    this._chartDimensions.radius = Math.min(height, width) / 2;


  }

  setSeries(series: Series) {
    this._series = series;
  }

  setColors(colorArray: string[]) {

    let colorScale = scaleOrdinal(colorArray);
    this._colorScale = colorScale

  }

  initializeSvg() {

    let svg = this._container.append("svg");
    svg.attr("height", this._chartDimensions.height);
    svg.attr("width", this._chartDimensions.width);
    this._selections.svgContainer = svg;

  }

  render() {
    this.setPie();
    this.setArc();
    let dataJoin =< dataJoin >this.createDataJoin();
    this.exitPattern(dataJoin);
    this.runUpdatePattern(dataJoin);

  }

  runUpdatePattern(dataJoin: dataJoin){ //this parameter represents the data
    let self =this;
    console.log(dataJoin);
    let enterSelection = dataJoin.enter()
    .append("path");
    let updateSelection = dataJoin.merge(enterSelection)
    .classed(`.${this.instanceUniqueId}_arc`,true)
    .transition().duration(400)
    .attr("d", <any>this._selections.arc)
      .style("fill",function(d:any,i:any){
        return self._colorScale(i);
      });



  }

  exitPattern(dataJoin: dataJoin){
    dataJoin.exit().remove();
  }

  createDataJoin(): d3Selection {

    let pieData = this._selections.pie(this._series[0].data.map(
      function (d) {
        return d.score;
      }
    ))


    let dataJoin = this._selections.pieContainer
      .selectAll("path")
      .data(pieData);

    return dataJoin;

  }

  setArc() {
    let currentArc = < Arc < any,
      any >> arc();
    currentArc.innerRadius(this._chartDimensions.innerRadius);
    currentArc.outerRadius(this._chartDimensions.radius);
    currentArc.cornerRadius(this._chartDimensions.cornerAngle);
    //  currentArc.startAngle(this._chartDimensions.startAngle);
    //  currentArc.endAngle(Math.PI / 2);
    this._selections.arc = currentArc;
  }

  setPie() {

    let currentPie = pie()
      .sort(null);

    this._selections.pie = currentPie
  }


}
