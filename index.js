/**
 * Function to convert currency.
 *
 * @param {number} amount - The amount to convert.
 * @param {string} fromCurrency - The source currency code.
 * @param {string} toCurrency - The target currency code.
 * @returns {Promise<number>} The converted amount.
 * @throws {Error} If the currency conversion fails.
 */

const axios = require('axios')

//Function to convert currency
async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        //console.log("Before API request");
        //api requests
        const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        //console.log("After API response");

        const exchangeRate = response.data.rates[toCurrency];


        const convertedAmnt = amount * exchangeRate;

        return convertedAmnt;

    } catch (error) {
        throw new Error('Currency conversion failed.');
    }

}


// Get commandline argumants
const [, , amount, fromCurrency, toCurrency] = process.argv;
console.log(process.argv);

convertCurrency(Number(amount), fromCurrency, toCurrency)
    .then(
        (convertedAmount) => {
            //console.log('Inside .then() block');
            console.log(`Converted Amount: ${amount} ${fromCurrency} == ${convertedAmount} ${toCurrency}`);
        }
    )
    .catch((error) => {
        //console.log('Inside .catch() block');
        console.log('Error:', error);
    });
