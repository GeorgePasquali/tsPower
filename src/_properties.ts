

export default class CProperties {
    private id: string;
    private class: string;
    private width: number;
    private height: number;
    private margins: { 
        top: number,
        right: number,
        bottom: number,
        left: number
    };
    private chartType: string;

    constructor(config: any){
        
        if(config.width){
            this.width = config.width;
        }
        
    }

    

    setWidthAndHeight(width:number,height:number){

    }
    setClass(classStr:string){
        this.class = classStr;
    }

}
