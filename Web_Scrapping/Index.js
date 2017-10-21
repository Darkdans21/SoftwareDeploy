var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){

url = 'http://www.imdb.com/title/tt0948103/?ref_=nv_sr_1';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, rating_value, description;
    var json = { title : "", rating_value : "", description : ""};

    $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text();            
        storyTitle = data.children().last().children().text();
        json.title = title;
 
    })

        $('.title_block').filter(function(){
        var data = $(this);             
        rating_value = data.children().last().children().text();
        json.rating_value = rating_value;
    })

    $('.summary_text').filter(function(){
        var data = $(this);
        description = data.text();
        json.description = description;
    })
}

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

res.send('Check your console!')

    }) ;
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;