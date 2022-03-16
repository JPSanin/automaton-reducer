class MooreMachine {

    constructor(states, outputs) {
        this.states = states;
        this.outputs = outputs;
        this.partition = [];
        this.initialState=states[0];
        this.reducedMoore = [];
    }

    removeUnaccessible() {
        //Set accessible
        //console.log(this.states[0]);
        this.states[0].makeAccessible();
        //console.log(this.states[0], this.states[1], this.states[2]);

        // While i < content.length, for cada estado validar, avanzar en el contenido
        let contentCounter = 0;
        while (contentCounter < this.states[0].content.length) {

            for (let j = 0; j < this.states.length; j++) {

                if (this.states[j].content[contentCounter] != this.states[j].name) {
                    let checkingState = this.findState(this.states[j].content[contentCounter]);
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
        //create partitions for each output
        for (let j = 0; j < this.outputs.length; j++) {

            this.partition.push([]);
        }
        // while i < outputs.length; for states check if == outputs add to new partition
        let outputsCounter = 0;
        while (outputsCounter < this.outputs.length) {

            for (let j = 0; j < this.states.length; j++) {

                if (this.states[j].response == this.outputs[outputsCounter]) {
                    this.partition[outputsCounter].push(this.states[j]);
                }
            }
            outputsCounter++;
        }

        //Remove empty outputs
        for (let j = 0; j < this.partition.length; j++) {
            if (this.partition[j].length == 0) {
                this.partition.splice(j, 1);
            }
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
        for (let i = 0; i < this.partition.length; i++) {
            for (let j = 0; j < this.partition[i].length; j++) {
                if(this.initialState.name == this.partition[i][j].name){
                    this.reducedMoore.push(this.initialState);
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
            this.reducedMoore.push(this.partition[i][0]);
        }
        console.log(this.partition);
        console.log(this.reducedMoore);
    }

    findState(name) {
        for (let i = 0; i < this.states.length; i++) {
            if (name == this.states[i].name) {
                return this.states[i];
            }
        }
    }


    compare(s1, s2) {
        console.log(s1.name, s2.name);
        let validArr = [];
        for (let i = 0; i < s1.content.length; i++) {
            if (this.findPartition(s1.content[i]) == this.findPartition(s2.content[i])) {
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

    reducedMooreStates(){
        let states=[]
        for (let i = 0; i < this.reducedMoore.length; i++) {
            states.push(this.reducedMoore[i].name);
        }
        return states;
    }

    reducedMooreData(){
        let data=[]
        for (let i = 0; i < this.reducedMoore.length; i++) {
            let d = this.reducedMoore[i].content;
            d.push(this.reducedMoore[i].response);
            data.push(d);
        }
        return data;
    }
}