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

    //<script src="https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse"></script>

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

function getBookName(callback) {
  var bookName = [
    {
      name: 'book_name',
      type: 'input',
      message: 'Enter the name of the book you want search for:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a value ';
        }
      }
    }
   ];
    inquirer.prompt(bookName).then(callback);
}
request('https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse').pipe(fs.createWriteStream("output.htm"));

/*request('https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});*/