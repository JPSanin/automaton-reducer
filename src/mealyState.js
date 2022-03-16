class MealyState{
    constructor(name, cont){
        this.name=name;
        this.content = cont;
        this.accessible = false;
        this.response = "";
        for(let i =0; i<this.content.length; i++){
            this.response+=this.content[i][this.content[i].length-1];
        }
        //console.log(" "+ this.name, this.content, this.response);
    }

    makeAccessible(){
        this.accessible=true;
    }
}