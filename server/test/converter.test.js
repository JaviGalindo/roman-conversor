const expect = require('chai').expect;
const request = require('request');

const badFormatString = "Format not valid";
const testRomanCaseSuccess = [
    { "roman": "I", "expectedValue": 1 },
    { "roman": "IV", "expectedValue": 4 },
    { "roman": "MMMCMXCIX", "expectedValue": 3999 },
    { "roman": "XL", "expectedValue": 40 },
    { "roman": "CD", "expectedValue": 400 },
    { "roman": "VIII", "expectedValue": 8 },
    { "roman": "DCCC", "expectedValue": 800 },
    { "roman": "MMXIX", "expectedValue": 2019 }
];
const testRomanCaseError = [
    { "roman": "IIII", "expectedValue": badFormatString },
    { "roman": "IIV", "expectedValue": badFormatString },
    { "roman": "CMMMCMXCIX", "expectedValue": badFormatString },
    { "roman": "XAL", "expectedValue": badFormatString },
    { "roman": "DM", "expectedValue": badFormatString },
    { "roman": "VIIII", "expectedValue": badFormatString },
    { "roman": "CDCCC", "expectedValue": badFormatString },
    { "roman": "LMMXIX", "expectedValue": badFormatString }
];

const testNumericCaseSuccess = [
    { "numeric": 1, "expectedValue": "I" },
    { "numeric": 4, "expectedValue": "IV" },
    { "numeric": 3999, "expectedValue": "MMMCMXCIX" },
    { "numeric": 40, "expectedValue": "XL" },
    { "numeric": 400, "expectedValue": "CD" },
    { "numeric": 8, "expectedValue": "VIII" },
    { "numeric": 800, "expectedValue": "DCCC" },
    { "numeric": 2019, "expectedValue": "MMXIX" }
];
const testNumericCaseError = [
    { "numeric": "IIII", "expectedValue": badFormatString },
];

describe("Testing Roman to numeric - successfull Tests", () => {
    testRomanCaseSuccess.forEach(element => {
        it(`Testing Roman To Numeric roman: ${element.roman}, expectedValue: ${element.expectedValue}`, (done) => {
            request(`http://localhost:5000/api/v1/convertToNumeric?number=${element.roman}`, function (error, response, body) {
                let res = JSON.parse(body);

                expect(response.statusCode).to.equal(200);
                expect(res.message).to.equal(element.expectedValue);
                done();
            });
        })

    });
})

describe("Testing Roman to numeric - error tests", () => {
    testRomanCaseError.forEach(element => {
        it(`Testing Roman To Numeric roman: ${element.roman}, expectedValue: ${element.expectedValue}`, (done) => {
            request(`http://localhost:5000/api/v1/convertToNumeric?number=${element.roman}`, function (error, response, body) {
                let res = JSON.parse(body);

                expect(response.statusCode).to.equal(400);
                expect(res.message).to.equal(element.expectedValue);
                done();
            });
        })

    });
})

describe("Testing Numeric to roman - successfull Tests", () => {
    testNumericCaseSuccess.forEach(element => {
        it(`Testing Numeric to roman: ${element.numeric}, expectedValue: ${element.expectedValue}`, (done) => {
            request(`http://localhost:5000/api/v1/convertToRoman?number=${element.numeric}`, function (error, response, body) {
                let res = JSON.parse(body);

                expect(response.statusCode).to.equal(200);
                expect(res.message).to.equal(element.expectedValue);
                done();
            });
        })

    });
});

describe("Testing Error to roman", () => {

    it(`Expected error because number is bigger than 3999`, (done) => {
        request(`http://localhost:5000/api/v1/convertToRoman?number=4000`, function (error, response, body) {
            const expectedValue = "Error number too big";
            let res = JSON.parse(body);
            expect(response.statusCode).to.equal(400);
            expect(res.message).to.equal(expectedValue);
            done();
        });
    })

});