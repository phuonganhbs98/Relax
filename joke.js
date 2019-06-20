/*
	Chuc nang: random joke, random fortune
	source joke: https://api.chucknorris.io/
	source fortune: https://github.com/sarah256/fortune-api
*/

const axios = require('axios');
var fs = require('fs');
var readLineSync = require('readline-sync');
var username = readLineSync.question('>>What\'s your name?   ');
console.log('Hi', username, '!' );
main();

function readJoke(){
	axios.get('https://api.chucknorris.io/jokes/random')
		.then(function (response){
			console.log('\n',response.data.value,'\n');
		}).then(function(){
			setTimeout(function(){
				var rep = readLineSync.question('>> Do you want to read more? Y/n?  ');
				if(rep.toUpperCase() === 'Y')
					readJoke();
				else main();
			}, 2000);
		})
}

function readFortune(){
	var buf = fs.readFileSync('fortunes.txt', 'utf8');
	var array = buf.split('%');
	var randomIndex = Math.round(Math.random()*432);
	console.log(array[randomIndex]);
	setTimeout(function(){
		var rep = readLineSync.question('>> Do you want to try again? Y/n?  ');
		if(rep.toUpperCase() === 'Y')
			readFortune();
		else main();
	}, 2000);
}

function main(){
	var selects = ['Jokes', 'Fortune'];
	
		setTimeout(function(){
		console.log('============');
		var index = readLineSync.keyInSelect(selects, '>>Today what do you want to do?');
		if(index === 0){
			readJoke();
		}
		else if(index === 1) readFortune();
		else console.log('*** Have a good day ***');
	}, 2000);
}