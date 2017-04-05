import User from './someModule';
import constructionPattern from './_constructionPattern'
import * as selector from 'd3-selection';
import * as axis from 'd3-axis';

class HDC {
    private _properties:any;
    private _data: any;
    private _constructionPattern: constructionPattern;



    constructor(divContainer:string, chartType: string, properties: object){
        
        if(divContainer)
        {
            let setParentSelector = selector.select(divContainer);

            this._constructionPattern.setParentSelector(setParentSelector);
        }

    }




}

var goga = new User('goga', 22);
goga.introduceYourself();
goga.useD3();

selector.select("body").append("rect").text("this is my first d3 inside my env");


