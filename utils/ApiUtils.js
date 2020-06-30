const axios = require("axios");

var counters = [
    {type:"chuck-norris-joke", counter: 0},
    {type:"kanye-quote", counter: 0}, 
    {type: "name-sum", counter: 0},
    {type: "useless-facts", counter: 0} //mine
];

const chuckApi = "https://api.chucknorris.io/jokes/random";
const kanyeApi = "https://api.kanye.rest";
const uselessFactsApi = "https://uselessfacts.jsph.pl/random.json?language=en"


async function surpriseMe(name, birthYear){
    let functions = [];
    addChuckIfNeeded(functions, birthYear);
    addKanyeIfNeeded(functions, name, birthYear);
    addNameSumIfNeeded(functions, name);
    addUselessFactsIfNeeded(functions, birthYear);
    return randomAndExcute(functions);
}

async function randomAndExcute(functions){
    let randomIndex = Math.floor(Math.random()*functions.length);
    let functionToRun = functions[randomIndex];
    return functionToRun();
}

function addChuckIfNeeded(functionsArray, birthYear){
    if(birthYear <= 2000){
        functionsArray.push(callChuckApi);
    }
}

function addKanyeIfNeeded(functionsArray, name, birthYear){
    if(birthYear > 2000 &&
         (name.length == 0 || 
            (name.charAt(0) != 'A' && name.charAt(0) != 'Z'))){
        functionsArray.push(callKanyeApi);
    }
}

function addNameSumIfNeeded(functionsArray, name){
    if(name.length == 0 || name.charAt(0) != 'Q'){
        functionsArray.push(nameSumFunctionBuilder(name));
    }
}

function addUselessFactsIfNeeded(functionsArray, birthYear){
    if(birthYear % 3 == 0){
        functionsArray.push(callUselessFactsApi);
    }
}

async function callChuckApi(){
    let response = await axios.get(chuckApi);
    let joke = response.data.value;
    counters[0].counter++;
    return {
        type: counters[0].type,
        result : joke,
    };
}

async function callKanyeApi(){
    let response = await axios.get(kanyeApi);
    let quote = response.data.quote;
    counters[1].counter++;
    return {
        type: counters[1].type,
        result : quote,
    };
}

//mine
async function callUselessFactsApi(){
    let response = await axios.get(uselessFactsApi);
    let fact = response.data.text + " source: " + response.data.source;
    counters[3].counter++;
    return {
        type: counters[3].type,
        result : fact,
    };
}

function nameSumFunctionBuilder(name){ 
    return () => {
        let letters = name.toLowerCase().split(' ').join('');
        let sum = 0;
        for(let index=0; index<letters.length; index++){
            sum += letters[index].charCodeAt(0) - 'a'.charCodeAt(0) + 1; 
        }
        counters[2].counter++;
        return new Promise ((resolve, reject)=>{
            data = {
                type: counters[2].type,
                result : sum,
            }
            resolve(data);
        });
    }
}

function stats(){
    let sumOfRequests = counters.reduce(function(total, arr) { 
        // return the sum with previous value
        return total + arr.counter;
      }, 0); //set initial value as 0
    return {
        requests: sumOfRequests,
        distribution: counters,
    }
}

module.exports={
    surpriseMe : surpriseMe,
    stats: stats, 
    addChuckIfNeeded : addChuckIfNeeded,
    callChuckApi: callChuckApi,
    addKanyeIfNeeded: addKanyeIfNeeded,
    callKanyeApi: callKanyeApi,
    addNameSumIfNeeded: addNameSumIfNeeded,
    callUselessFactsApi: callUselessFactsApi,
    addUselessFactsIfNeeded: addUselessFactsIfNeeded,
    stats: stats,
    nameSumFunctionBuilder: nameSumFunctionBuilder
}