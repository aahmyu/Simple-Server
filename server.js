var http = require("http");
var fs = require("fs");
var url = require('url');

function readfiles(path, fileType, response){
     fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
          response.writeHead(500);
          response.write('ERROR');
        }
        response.writeHead(200, {"Content-Type": fileType});
        response.write(data);
        response.end();
      });
}

function error(response){
   response.writeHead(404);
   response.write('The Page was Not Found');
   response.end();
}

function handleRequest(request, response) {

  if(request.url == '/'){
     readfiles('www/index.html', "text/html", response);
  }else if(request.url == '/styles.css'){
     readfiles('www/styles.css', 'text/css', response);
  }else if(url.parse(request.url).query != undefined){
    urlParse(request.url, response);
  }else if(request.url == '/page2.html'){
     readfiles('www/page2.html', "text/html", response);
  }else{
        error(response);
      }
}
var server = http.createServer(handleRequest);

server.listen(process.env.PORT, process.env.IP , function(error){
  if (error){
    console.log(error);
  } else {
    console.log("Server is listening");
  }
});

function urlParse(urlWithQuery, response){
  var theWholeSearchObj = url.parse(urlWithQuery, true);
  var name = theWholeSearchObj.query.name;
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write('Hello ' + name.bold());
  response.end();
}

