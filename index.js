import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const finals2014 = fifaData.filter(function(item) {
    return item.Year === 2014 && item.Stage === "Final"
})

console.log('task 1', finals2014);
//(a) Home Team name for 2014 world cup final
console.log('task 1a', finals2014[0]['Home Team Name']);
//(b) Away Team name for 2014 world cup final
console.log('task 1b', finals2014[0]['Away Team Name']);
//(c) Home Team goals for 2014 world cup final
console.log('task 1c', finals2014[0]['Home Team Goals']);
//(d) Away Team goals for 2014 world cup final
console.log('task 1d', finals2014[0]['Away Team Goals']);
//(e) Winner of 2014 world cup final */
console.log('task 1e', finals2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

UNDERSTAND:
  - Input: an array of objects
  - Output: a new array of objects that contains data only from teams that made to the final stage

PLAN:
  - instantiate an empty array that will hold teams that made it to the finals
  - iterate through the array
  - compare each object's Stage key to the string "Final" and if it returns True, push the Home and Away team name
      (Home Team Name & Away Team Name keys)
  - return the array with the teams that played in the finals
      
hint - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {

    function isFinal(obj) {
        return obj.Stage === "Final"
    }

    const finalsTeams = array.filter(isFinal)

    return finalsTeams
}

console.log(getFinals(fifaData))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set

UNDERSTAND:
- Input: array & getFinals function
- getFinals returns every object with the key-value pair Stage: "Final"
- Output: New array with all the years of games that were Final games (from getFinals)

PLAN:
- Instantiate an empty array called years
- Initialize an array called finals to the result of getFinals
- loop through the array finals and push the value of the key Year to the array years
- Return the years array
*/

function getYears(fifaData, getFinalsCB) {

    const years = []

    const finals = getFinalsCB(fifaData)

    for(let counter = 0; counter < finals.length; counter++) {
        years.push(finals[counter]["Year"])
    }


    return years
}

console.log(getYears(fifaData, getFinals))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` 

UNDERSTAND:
 - Input:  fifaData array and our getFinals function
 - Output: Names of winning teams in the array winners

PLAN:
 - create an empty array called winners ✅
 - First, call getFinals ✅
 - Second, pass fifaData to the getFinals function ✅
 - save the result of getFinals in a variable called finals ✅
 - loop through the finals array - compare Away Team goals key and Home Team Goals key ✅
 - If Home Team Goals is greater than Away Team Goals - Home Team won - add Home Team Name to winners array ✅
 - Finally, return the winners array
*/ 

function getWinners(fifaData, getFinals) {

    const winners = []

    const finals = getFinals(fifaData)

    for (let counter = 0; counter < finals.length; counter++) {
        if (finals[counter]["Home Team Goals"] > finals[counter]["Away Team Goals"]) {
            winners.push(finals[counter]["Home Team Name"])
        } else {
            winners.push(finals[counter]["Away Team Name"])
        }
    }

    return winners
}

console.log(getWinners(fifaData, getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

UNDERSTAND
input: fifaData array, getYears function, getWinners function
output: new array of string with string interpolation ${} saying which country won that year
- getYears returns an array of the years the finals were played
- getWinners returns an array country/team winners that year

PLAN
- Create new array called winnersString
- invoke getYears and pass in fifaData and getFinals - save the result in the variable years
- invoke getWinners and pass in fifaData and getFinals - save the result in the variable called winners
- create a for loop iterating through both the winners array and the years array
- push the string of who won to the array winnersString that year using the counter variable as the index using string interpolation
- return winnersString

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(fifaData, getYears, getWinners) {
    
    const winnersString = []

    const years = getYears(fifaData, getFinals)

    const winners = getWinners(fifaData, getFinals)

    for (let counter = 0; counter < years.length; counter ++) {
        winnersString.push(`In ${years[counter]}, ${winners[counter]} won the world cup!`)
    }

    return winnersString
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(/* code here */) {
   /* code here */
}




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}

export default {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}