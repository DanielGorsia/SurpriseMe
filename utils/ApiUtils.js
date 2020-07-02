const axios = require("axios");

let types = {
    "chuck": "chuck-norris-joke",
    "kanye": "kanye-quote",
    "nameSum": "name-sum",
    "facts": "useless-facts"
};

let counters =
{"chuck-norris-joke":  0,
"kanye-quote": 0, 
"name-sum": 0,
"useless-facts": 0};

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
    let type = types["chuck"];
    counters[type]++;
    return {
        type: type,
        result : joke,
    };
}

async function callKanyeApi(){
    let response = await axios.get(kanyeApi);
    let quote = response.data.quote;
    let type = types["kanye"];
    counters[type]++;
    return {
        type: type,
        result : quote,
    };
}

//another surprise
async function callUselessFactsApi(){
    let response = await axios.get(uselessFactsApi);
    let fact = response.data.text + " source: " + response.data.source;
    let type = types["facts"];
    counters[type]++;
    return {
        type: type,
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
        let type = types["nameSum"];
        counters[type]++;
        return new Promise ((resolve, reject)=>{
            data = {
                type: type,
                result : sum,
            }
            resolve(data);
        });
    }
}

function stats(){
    let countersArray = Object.values(counters);
    let sumOfRequests = countersArray.reduce(function(total, currElement) { 
        return total + currElement; // return the sum with previous value
      }, 0); //set initial value as 0
    let distributions = [];
    for(let key in counters){
        distributions.push({type: key, counter: counters[key]})
    }
    return {
        requests: sumOfRequests,
        distribution: distributions,
    }
}

module.exports={
    surpriseMe : surpriseMe,
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
