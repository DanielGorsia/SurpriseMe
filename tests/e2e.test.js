
const supertest = require('supertest');
const app = require('../main');


var counters = 
{"chuck-norris-joke":  0,
"kanye-quote": 0, 
"name-sum": 0,
"useless-facts": 0}
;

describe("Testing the surprise route", () => {

	it("tests the surprise route and return JSON with type and value properties", async () => {

		const response = await supertest(app).get('/api/surprise').query({
            name: "Daniel Gorsia",
            birth_year: 2000,
          });
          counters[response.body.type]++;

		expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('type');
        expect(response.body).toHaveProperty('result');
    });
    
    it("tests the surprise route and return JSON with type=name-sum and value properties", async () => {

		const response = await supertest(app).get('/api/surprise').query({
            name: "Ariel Gorsia",
            birth_year: 2003,
          });
        counters[response.body.type]++;

		expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('type');
        expect(response.body).toHaveProperty('result');
        expect(response.body.type).toEqual("name-sum");
	});

    it("tests the surprise route and return JSON with type=chuck noris and value properties", async () => {

		const response = await supertest(app).get('/api/surprise').query({
            name: "Quan",
            birth_year: 2000,
          });
        counters[response.body.type]++;

		expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('type');
        expect(response.body).toHaveProperty('result');
        expect(response.body.type).toEqual("chuck-norris-joke");
    });
    
    it("tests the surprise route and return JSON with type=kanye and value properties", async () => {

		const response = await supertest(app).get('/api/surprise').query({
            name: "Quan",
            birth_year: 2002,
          });
        counters[response.body.type]++;

		expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('type');
        expect(response.body).toHaveProperty('result');
        expect(response.body.type).toEqual("kanye-quote");
	});    
});

describe("Testing the stats route", () => {
    it("tests the stats route and return JSON with requests property and distribution array of {type, count} property", async () => {

       

        let name = "Daniel";
        let birthYear = 2001;
		const response1 = await getSurprise(name, birthYear); // only kanye, name sum and useless facts
        counters[response1.body.type]++;

        name = "Quan";
        birthYear = 2001;
		const response2 = await getSurprise(name, birthYear); // only kanye and useless facts
        counters[response2.body.type]++;

        name = "Quan";
        birthYear = 1900;
        const response3 = await getSurprise(name, birthYear); // only chuck
        counters[response3.body.type]++;

        name = "Ariel";
        birthYear = 2004;
        const response4 = await getSurprise(name, birthYear); // only name sum and useless facts
        counters[response4.body.type]++;

        name = "Ziv";
        birthYear = 2003;
        const response5 = await getSurprise(name, birthYear); // only name sum 
        counters[response5.body.type]++;

        name = "Daniel";
        birthYear = 300;
        const response6 = await getSurprise(name, birthYear); // only chuck, useless facts and name sum
        counters[response6.body.type]++;

        name = "Quan";
        birthYear = 2002;
        const response7 = await getSurprise(name, birthYear); // only kanye
        counters[response7.body.type]++;

        const responseStats = await supertest(app).get('/api/stats');

		expect(responseStats.status).toBe(200);
        expect(responseStats.body).toHaveProperty('requests');
        expect(responseStats.body).toHaveProperty('distribution');
        expect(responseStats.body.distribution.length).toEqual(4);
        expect(responseStats.body.requests).toEqual(11);
        expect(responseStats.body.distribution[0].counter).toEqual(counters["chuck-norris-joke"]);
        expect(responseStats.body.distribution[1].counter).toEqual(counters["kanye-quote"]);
        expect(responseStats.body.distribution[2].counter).toEqual(counters["name-sum"]);
        expect(responseStats.body.distribution[3].counter).toEqual(counters["useless-facts"]);
	});    
});


async function getSurprise(nameInput, birthYearInput){
    const response = await supertest(app).get('/api/surprise').query({
        name: nameInput,
        birth_year: birthYearInput,
      });
      return response;
}