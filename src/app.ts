import User from './someModule';
import constructionPattern from './_constructionPattern'
import * as selector from 'd3-selection';
import * as axis from 'd3-axis';
import CProperty from './_properties'


class HDC {
    private _properties:any;
    private _data: any;
    private _constructionPattern: constructionPattern;



    constructor(querySelector:string, chartType: string){
        
        let parentSelector = selector.select(querySelector);
        let parentDom = parentSelector.node();
        console.log(parentDom);
        

    }




}

var baba = new HDC("targetDiv",'neeee');

let goga = new CProperty({
    width:500,
    height:500,
});
// selector.select("body").append("rect").text("this is my first d3 inside my env");

let randConfig = {
    margins:{
        top:20,
        right:20,
        bottom:60,
        left:60
    },
    chartType:  "bar",
    width:500,
    height:400

}