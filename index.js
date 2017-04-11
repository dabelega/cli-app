'use strict';

var request 	= require('request');
var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');
var files 		= require('./lib/files');

   
clear();
console.log(
  chalk.red(
    figlet.textSync('CLI-APP', { horizontalLayout: 'full' })
  )
);

function handleResponse(response) {
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        console.log(item.volumeInfo.title);
      }
    }
 
 
var bookName = {
    type: "input",
    message: "Enter the book name: ",
    name: "book_name",
    
}
var API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
var lastcallback = '&callback=handleResponse';

 inquirer.prompt([bookName]).then(function (answers) {
    var query = answers.book_name;
    query = String(query);
    console.log(query);

    API_BASE_URL += '?' + 'q=' + query + lastcallback;

    request(API_BASE_URL, function (error, response, body) {
  	console.log('error:', error); 
  	console.log('statusCode:', response && response.statusCode); 
  	console.log(chalk.green('body:', body));  

	});

});

