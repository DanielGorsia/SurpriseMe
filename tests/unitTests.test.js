const utils = require("../utils/ApiUtils");

//Chuck functions
describe("addChuck function", () => {
    test("should add the callChuckApi function to an array for a birthYear=2000", () => {
      let array = [];
      let excpectedArray = [utils.callChuckApi];
      let birthYear = 2000;
      utils.addChuckIfNeeded(array, birthYear);

      expect(array).toEqual(excpectedArray);
        
    });
    test("shouldn't add the callChuckApi function to an array for a birthYear larger than 2000", () => {
      let array = [];
      let excpectedArray = [];
      let birthYear = 2001;
      utils.addChuckIfNeeded(array, birthYear);

      expect(array).toEqual(excpectedArray);
    });

    test("should add the callChuckApi function to an array for a birthYear = 300", () => {
      let array = [];
      let excpectedArray = [utils.callChuckApi];
      let birthYear = 300;
      utils.addChuckIfNeeded(array, birthYear);

      expect(array).toEqual(excpectedArray);
    });
});

//Kanye function
describe("addKanye function", () => {
  test("should add the callKanyeApi function to an array for a name=Daniel Gorsia and birthYear greater than 2000", () => {
    let array = [];
    let excpectedArray = [utils.callKanyeApi];
    let birthYear = 2001;
    let name = "Daniel Gorsia";
    utils.addKanyeIfNeeded(array, name, birthYear);

    expect(array).toEqual(excpectedArray);
      
  });
  test("shouldn't add the callChuckApi function to an array for a  name=Ariel Gorsia and birthYear greater than 2000", () => {
    let array = [];
    let excpectedArray = [];
    let birthYear = 2001;
    let name = "Ariel Gorsia";
    utils.addKanyeIfNeeded(array, name, birthYear);

    expect(array).toEqual(excpectedArray);
  });

  test("shouldn't add the callKanyeApi function to an array for a  name=Ziv and birthYear greater than 2000", () => {
    let array3 = [];
    let excpectedArray = [];
    let birthYear = 2001;
    let name3 = "Ziv";
    utils.addKanyeIfNeeded(array3, name3, birthYear);

    expect(array3).toEqual(excpectedArray);
  });

  test("shouldn't add the callKanyeApi function to an array for a  name=Yossi and birthYear smaller than 2000", () => {
    let array = [];
    let excpectedArray = [];
    let birthYear = 1900;
    let name = "Yossi";
    utils.addKanyeIfNeeded(array, name, birthYear);

    expect(array).toEqual(excpectedArray);
  });

  test("should add the callKanyeApi function to an array for a name=empty string and birthYear greater than 2000", () => {
    let array = [];
    let excpectedArray = [utils.callKanyeApi];
    let birthYear = 3000;
    let name = "";
    utils.addKanyeIfNeeded(array, name, birthYear);

    expect(array).toEqual(excpectedArray);
  });
});

//Name-sum functions
describe("addNameSum function", () => {
  test("should add the nameSum function to an array for a name=Daniel Gorsia", () => {
    let array = [];
    let excpectedLength = 1;
    let name = "Daniel Gorsia";
    utils.addNameSumIfNeeded(array, name);

    expect(array.length).toEqual(excpectedLength);
      
  });
  test("shouldn't add the nameSum function to an array for a name=Quan Van", () => {
    let array = [];
    let excpectedArray = [];
    let name = "Quan Van";
    utils.addNameSumIfNeeded(array, name);

    expect(array).toEqual(excpectedArray);
  });

  test("shouldn't add the nameSum function to an array for a name=empty string", () => {
    let array = [];
    let excpectedLength = 1;
    let name = "";
    utils.addNameSumIfNeeded(array, name);

    expect(array.length).toEqual(excpectedLength);
  });
});

//useless facts functions
describe("addUselessFacts function", () => {
  test("should add the uselessFacts function to an array for a birthYear=1800", () => {
    let array = [];
    let excpectedArray = [utils.callUselessFactsApi];
    let birthYear = 1800;
    utils.addUselessFactsIfNeeded(array, birthYear);

    expect(array).toEqual(excpectedArray);
      
  });
  test("should add the uselessFacts function to an array for a birthYear=0", () => {
    let array = [];
    let excpectedArray = [utils.callUselessFactsApi];
    let birthYear = 0;
    utils.addUselessFactsIfNeeded(array, birthYear);

    expect(array).toEqual(excpectedArray);
      
  });
  test("shouldn't add the uselessFacts function to an array for a birthYear=1802", () => {
    let array = [];
    let excpectedArray = [];
    let birthYear = 1802;
    utils.addUselessFactsIfNeeded(array, birthYear);

    expect(array).toEqual(excpectedArray);
  });

  test("shouldn't add the uselessFacts function to an array for a birthYear=-1400", () => {
    let array = [];
    let excpectedArray = [];
    let birthYear = -1400;
    utils.addUselessFactsIfNeeded(array, birthYear);

    expect(array).toEqual(excpectedArray);
  });
});

// call chuck api functions
describe("callChuckApi function", () => {
  test("should return a type=chuck and result=joke", async () => {
    let response = await utils.callChuckApi();

    expect(response).toHaveProperty('type');
    expect(response).toHaveProperty('result');
    expect(response.type).toEqual("chuck-norris-joke");      
  });
});

// call kanye api functions
describe("callKanyeApi function", () => {
  test("should return a type=kanye and result=quote", async () => {
    let response = await utils.callKanyeApi();

    expect(response).toHaveProperty('type');
    expect(response).toHaveProperty('result');
    expect(response.type).toEqual("kanye-quote");      
  });
});

// call name sum functions
describe("callNameSum function", () => {
  test("should return a type=name-sum and result=number", async () => {
    let name = "Daniel";
    let functionToRun = utils.nameSumFunctionBuilder(name);
    let response = await functionToRun();

    expect(response).toHaveProperty('type');
    expect(response).toHaveProperty('result');
    expect(response.type).toEqual("name-sum");      
    expect(response.result).toEqual(45);      
  });

  test("should return a type=name-sum and result=number and comparison between upper case and lower case", async () => {
    let name = "Daniel Gorsia";
    let name2 = "daniel gorsia";
    let functionToRun = utils.nameSumFunctionBuilder(name);
    let response = await functionToRun();
    let functionToRun2 = utils.nameSumFunctionBuilder(name2);
    let response2 = await functionToRun2();

    expect(response).toHaveProperty('type');
    expect(response).toHaveProperty('result');
    expect(response.type).toEqual("name-sum"); 

    expect(response2).toHaveProperty('type');
    expect(response2).toHaveProperty('result');
    expect(response2.type).toEqual("name-sum"); 

    expect(response.result).toEqual(response2.result);  
    expect(response.result).toEqual(114); 

  });
});

// call uselessFacst function
describe("callUselessFacts function", () => {
  test("should return a type=kanye and result=fact", async() => {
    let response = await utils.callUselessFactsApi();

    expect(response).toHaveProperty('type');
    expect(response).toHaveProperty('result');
    expect(response.type).toEqual("useless-facts");           
  });
});