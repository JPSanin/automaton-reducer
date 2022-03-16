//Elements
const instructions= document.getElementById("instructions");
const states_input= document.getElementById("states");
const inputa_input= document.getElementById("i_alphabet");
const outputa_alphabet= document.getElementById("o_alphabet");
const submit=document.getElementById("submit");
const  form= document.getElementById("form");
const  table= document.getElementById("table");
const  mealyForm= document.getElementById("mealyForm");
const localStorage= window.localStorage;

let showTable=0;

const getData= (e,event)=>{
    const states = states_input.value;
    const input = inputa_input.value;
    const output = outputa_alphabet.value;
    createMealy(states,input,output);
}


function createMealy(q,s,r){
    
    instructions.innerHTML="Fill the states with their response state and finish with their output"
    console.log(q);
    console.log(s);
    console.log(r);
    showTable=1;
    let message=document.createElement("h5");
    message.innerHTML="Ej: For state A and inputs and outputs 0,1, response for 0 is B with output 1, and for 1 is C with output 0 write B,1;C,0";
    let message2=document.createElement("h5");
    message2.innerHTML="The amount of responses should be equal to the size of the input alphabet and the output has to belong to output alphabet";
    table.append(message);
    table.append(message2);
   
    let statesSep= q.split(",");
    console.log(statesSep);
    statesSep.forEach(element => {
        let inputCont = document.createElement("div");
        inputCont.className="input_cont";
        let lab =  document.createElement("label");
        lab.innerHTML=element+": ";
        let inp =  document.createElement("input");
        inp.type="text";
        inp.placeholder="A,0; B,1...;C,0"
        inputCont.appendChild(lab);
        inputCont.appendChild(inp);
        mealyForm.appendChild(inputCont);
    });

    let submitBtn = document.createElement("button");
    submitBtn.type="button";
    submitBtn.innerHTML="Submit";
    submitBtn.className="btn";
    mealyForm.appendChild(submitBtn);
    table.appendChild(mealyForm);
   
    //Mandar local storage
    let jsonStates= JSON.stringify(q);
    localStorage.setItem("states",jsonStates);
    let jsonInput= JSON.stringify(s);
    localStorage.setItem("input",jsonInput);
    let jsonOutput= JSON.stringify(r);
    localStorage.setItem("output",jsonOutput);
    submitBtn.addEventListener("click", function(){
        getDataMachine(q,r,s);
    });

    showView();
    
}

function getDataMachine(q,r,s){
    console.log(q);
    console.log(s);
    console.log(r);
    console.log(mealyForm.elements);
    let elements = mealyForm.elements;
    let obj =[];
    for(let i = 0 ; i < elements.length-1; i++){
        let item = elements.item(i);
        obj[i] = item.value;
    }
  
    let json= JSON.stringify(obj);
    localStorage.setItem("data",json);
    showTable=2;
    showView()
}


function showView() {
    if (showTable === 0) {
        table.style.display = "none";
        form.style.width = "100%";
        form.style.display= "flex";
        form.style.flexDirection= "column";
        form.style.justifyContent= "center";
        

        
    } else if(showTable === 1){
        form.style.display = "none";
        table.style.display = "flex";
        
    } else if(showTable === 2){
        window.location.href="mealyReduced.html";
    }
}

submit.addEventListener("click", getData);
showView();