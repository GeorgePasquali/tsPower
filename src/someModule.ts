
import * as d3 from 'd3-selection';

export default class User{
    private name: string;
    private age: number;

    constructor(n:string ,a:number ){
        this.name = n;
        this.age = a;
    }

    introduceYourself(){
        console.log("name: " , this.name);
        console.log("age:" , this.age);
        
    }
    useD3(){
        d3.select('body').append('p').text('hopefully i can use d3 in here as well');
    }
}