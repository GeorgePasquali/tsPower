import "../css/index.css";
import { PieChart } from "./library/PieChart";


const pieChartInstance : PieChart = new PieChart({
  container: "#targetDiv2",
  colors: ["#280B45", "#61105E", "#C84771", "#FFE98A", "#a05d56", "#d0743c", "#ff8c00"],
  plotOptions: {
    innerRadius: 100,
    cornerAngle: 5
  },
  series: [{
    data: [{
            name: 'Microsoft Internet Explorer',
            score: 56.33
        }, {
            name: 'Chrome',
            score: 24.03,
        }, {
            name: 'Firefox',
            score: 10.38
        }, {
            name: 'Safari',
            score: 4.77
        },]
  }]
});

pieChartInstance.initializeConfig({


  series: [{
    data: [{
            name: 'Microsoft Internet Explorer',
            score: 56.33
        }, {
            name: 'Chrome',
            score: 24.03,
        }, {
            name: 'Firefox',
            score: 10.38
        }, {
            name: 'Safari',
            score: 4.77
        },{
            name: 'opera',
            score: 31.77
        }]
  }]
});

setTimeout(function(){
  pieChartInstance.render();
}
,2000)

// tslint:disable-next-line
console.log(pieChartInstance);

