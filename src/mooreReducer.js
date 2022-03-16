
const initial_table= document.getElementById("initial_table");
const final_table= document.getElementById("final_table");
//Get data
const localStorage= window.localStorage;

let obj=localStorage.getItem("data");
let data=JSON.parse(obj);

for(let i=0; i<data.length; i++){
    data[i]=data[i].split(",")
}

let obj1=localStorage.getItem("states");
let states=JSON.parse(obj1);
states=states.split(",");

let obj2=localStorage.getItem("input");
let input=JSON.parse(obj2);
input=input.split(",");

let obj3=localStorage.getItem("output");
let output=JSON.parse(obj3);
output=output.split(",");

/*
console.log(data);
console.log(states);
console.log(input);
console.log(output);*/

createTable(initial_table, "Initial Automaton", data, states, input);

//Crear Moore
let mooreStates = [];

for(let i=0; i< data.length;i++){
    mooreStates.push(new MooreState(states[i], data[i]));
}

let mooreMachine = new MooreMachine(mooreStates,output);
//console.log(mooreMachine);
//Eliminar estados vacios
mooreMachine.removeUnaccessible();

//Partir primera con estados de misma respuesta
mooreMachine.firstPartition();

//Partir por estados en mismo grupo 
mooreMachine.simplify();

//reducir
mooreMachine.reduce();

createTable(final_table, "Reduced Automaton", mooreMachine.reducedMooreData(), mooreMachine.reducedMooreStates(), input);

function createTable(table, cap, d, s, inp){
    let caption = document.createElement("caption");
    caption.innerHTML=cap;
    let table_head = document.createElement("tr");
    let table_states = document.createElement("th");
    table_states.innerHTML="States/Input";
    let table_out = document.createElement("th");
    table_out.innerHTML="Output";
    table.appendChild(caption);
    table.appendChild(table_head);
    table_head.appendChild(table_states);
    
    for(let i=0; i< inp.length; i++){
        let table_input = document.createElement("th");
        table_input.innerHTML=inp[i];
        table_head.appendChild(table_input);
    }
    table_head.appendChild(table_out);
    
    for(let i=0; i<s.length; i++){
    
        let table_row= document.createElement("tr");
        let table_state = document.createElement("td");
        table_state.innerHTML=s[i];
        table.appendChild(table_row);
        table_row.appendChild(table_state);
    
        for(let j=0; j<d[i].length; j++){
           let table_content = document.createElement("td");
           table_content.innerHTML=d[i][j];
           table_row.appendChild(table_content);
        }
    }
}





