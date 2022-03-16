class MooreState{
    constructor(name, cont){
        this.name=name;
        this.content = cont;
        this.response = this.content[this.content.length-1];
        this.content.pop();
        //console.log(" "+ this.name, this.content, this.response);
        this.accessible = false;
        
    }

    makeAccessible(){
        this.accessible=true;
    }
}