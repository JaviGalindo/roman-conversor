import express from 'express';

const router = express.Router();

/**
 * Converts a number to Roman
 */
router.get('/api/v1/convertToRoman', (req, res) => {
    const number = parseInt(req.query.number);
    console.info("Convert Numeric to Roman", number);
    if (isNaN(number) ) {
        console.error("Error is not a number", number);
        sendError(res, {
            succes: false,
            message: "It must be a number",
        });
    } else if(number>3999) {
        console.error("Error number too big", number);
        sendError(res, {
            succes: false,
            message: "Error number too big",
        });
    } else {
        const digits = String(+number).split("");
        const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        let roman_num = "";
        let i = 3;
        while (i--) {
            roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
        }
        const romanResult =  Array(+digits.join("") + 1).join("M") + roman_num;
        sendSuccess(res, {
            success: 'true',
            message: romanResult,
        })

    }
});

/**
 * Convert Roman to numeric
 */
router.get('/api/v1/convertToNumeric', (req, res) => {
    const equivalent = { "I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000 }
    const romanNumber = req.query.number;
    if (!validateRomanNumeral(romanNumber)) {
        console.error("Error");
        sendError(res, {
            succes: false,
            message: "Format not valid",
        });

    } else {
        const splitNumber = romanNumber.split("");
        let total = 0;
        for (let i = 0; i < splitNumber.length; i++) {
            let numValue = equivalent[splitNumber[i]];
            if (numValue < equivalent[splitNumber[i + 1]]) {
                numValue = -numValue;
            }
            total = total + numValue;
            console.log("letter: " + splitNumber[i], " | value: " + numValue, " | total:" + total);
        }
        sendSuccess(res, {
            success: 'true',
            message: total,
        })
    }
});

/**
 * Check if the given roman number is valid and return true or false
 * @param {String} number Roman number 
 * @return {Boolean}
 */
const validateRomanNumeral = (number) => /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/.test(number);
/**
 * Send an error code and message to the client
 * @param res 
 * @param error 
 */
const sendError = (res, error) => res.status(400).send(error);
/**
 * Send a successful code and message to the client
 * @param res 
 * @param response
 */
const sendSuccess = (res, response) => res.status(200).send(response);

export default router;