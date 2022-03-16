class MealyMachine {
    constructor(states, outputs) {
        this.states = states;
        this.outputs = outputs;
        this.partition = [];
        this.initialState = states[0];
        this.reducedMealy = [];
        this.responses = [];
        for (let i = 0; i < this.states.length; i++) {
            this.responses.push(this.states[i].response);
        }
       
        let uniqueR = [];
        this.responses.forEach((element) => {
            if (!uniqueR.includes(element)) {
                uniqueR.push(element);
            }
        });
        this.responses= uniqueR;
    }

    removeUnaccessible() {
        //Set accessible
        //console.log(this.states[0]);
        this.states[0].makeAccessible();
        //console.log(this.states[0], this.states[1]);

        // While i < content.length, for cada estado validar, avanzar en el contenido
        let contentCounter = 0;
        while (contentCounter < this.states[0].content.length) {
            for (let j = 0; j < this.states.length; j++) {
                if (this.states[j].content[contentCounter][0] != this.states[j].name) {
                    let checkingState = this.findState(this.states[j].content[contentCounter][0]);
                    checkingState.makeAccessible();
                }
            }
            contentCounter++;
        }

        //remove unaccessible
        for (let j = 0; j < this.states.length; j++) {
            if (this.states[j].accessible == false) {
                this.states.splice(j, 1);
            }
        }

        //console.log(this.states);
    }


    firstPartition() {
        //create partitions for each state
        for (let j = 0; j < this.responses.length; j++) {
            this.partition.push([]);
        }
        //  for states check if == to other add to new partition
        console.log(this.states);
        console.log(this.partition);
        let rCounter = 0;
        while (rCounter < this.responses.length) {

            for (let j = 0; j < this.states.length; j++) {

                if (this.states[j].response == this.responses[rCounter]) {
                    this.partition[rCounter].push(this.states[j]);
                }
            }
            rCounter++;
        }



        console.log(this.partition);
    }

    simplify() {
        let newp = [];
        for (let j = 0; j <= this.partition.length; j++) {

            newp.push([]);
        }

        let outCounter=1;
        while (outCounter!=0) {
            outCounter = 0;
            for (let i = 0; i < this.partition.length; i++) {
                for (let j = 0; j < this.partition[i].length; j++) {
                    for (let k = 0; k < this.partition[i].length; k++) {
                        if (this.compare(this.partition[i][j], this.partition[i][k])) {
                            //agregar a newp
                            console.log("add:" + this.partition[i][k].name);
                            newp[i].push(this.partition[i][k]);
                        } else {
                            //add to other
                            console.log("out:" + this.partition[i][k].name);
                            newp[newp.length - 1].push(this.partition[i][k]);
                            outCounter++;
                        }
                    }
                    break
                }

            }
            console.log(outCounter);
            console.log(newp);
           
            if(outCounter===0){
                newp.pop();
            }
            console.log(this.partition);
            console.log(newp);

            if (outCounter!=0) {
                this.partition = newp;
                newp = [];
                for (let j = 0; j <= this.partition.length; j++) {
                    newp.push([]);
                }
            }
           
            
        }
    }

    reduce(){
        //find initial state
        console.log(this.initialState);
        for (let i = 0; i < this.partition.length; i++) {
            for (let j = 0; j < this.partition[i].length; j++) {
                if(this.initialState.name == this.partition[i][j].name){
                    this.reducedMealy.push(this.initialState);
                    //remove partition if more than one, else remove
                    if(this.partition.length>1){
                        this.partition.splice(i, 1);
                    }else{
                        this.partition[i].splice(j, 1);
                    }
                    
                }
            }
        }
        
        for (let i = 0; i < this.partition.length; i++) {
            this.reducedMealy.push(this.partition[i][0]);
        }
        
    }

    findState(name) {
        for (let i = 0; i < this.states.length; i++) {
            if (name == this.states[i].name) {
                return this.states[i];
            }
        }
    }

    compare(s1, s2) {
        console.log(s1, s2);
        let validArr = [];
        for (let i = 0; i < s1.content.length; i++) {
            if (this.findPartition(s1.content[i][0]) == this.findPartition(s2.content[i][0])) {
                validArr.push(true);
            }
        }
        if (validArr.length == s1.content.length) {
            return true;
        } else {
            return false;
        }

    }

    findPartition(name) {
        for (let i = 0; i < this.partition.length; i++) {
            for (let j = 0; j < this.partition[i].length; j++) {
                if (name == this.partition[i][j].name) {
                    return this.partition[i];
                }
            }
        }


    }

    reducedMealyStates(){
        let states=[]
        for (let i = 0; i < this.reducedMealy.length; i++) {
            states.push(this.reducedMealy[i].name);
        }
        return states;
    }

    reducedMealyData(){
        let data=[]
        for (let i = 0; i < this.reducedMealy.length; i++) {
            data.push( this.reducedMealy[i].content);
        }
        return data;
    }
}