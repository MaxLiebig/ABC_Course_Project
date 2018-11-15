/**
 * Simple node WebServer for ConFI Testclient
 * All backend REST service base URLs have to be set as environment variables
 * Node reads teh environemnt variables and provides them for the test client web application
 * Please see README.md for installation details
 */
const port = 3001
const fs = require('fs');

const connect = require('connect');
const http = require('http')
const finalhandler = require('finalhandler')

const express = require('express')
const path = require('path')
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
 
/* variables */
const infoFile = path.join(__dirname,'info.json');
const srcPath = path.join(__dirname,'src');
const cors = require('cors')

var app = express()
app.use(cors());

app.get('/', function (req, res) {
    res.send('<html><body><h1>Hello World</h1><a href="/data/test.json">saved data</a><form action="/data/test.json" method="POST"><label>test<input name="test"/></label><button>store</button></form></body></html>');
});

const testClient = serveStatic(srcPath, {'index': ['index.html']});

const accessLogger = function (req, res, next) {
    const now = new Date();
    console.log(now.toString(),req.method,req.url);
    next();
};

app.use(accessLogger);
app.get('/info',function (req, res) {
    if (!fs.existsSync(infoFile)) {
        console.error('Cound not find ' + infoFile + ' to parse for info');
        res.send('no info available');
    } else {
        fs.readFile(infoFile, 'utf8', function (err,data) {
            if (err) {
                console.error('Cound not read ' + infoFile + ' to parse for info',err);
                res.status(404).send('no info available');
            } else {
                res.send(data);
            }
        })
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post(/data\/.*/,function(req,res){
    let basename = path.basename(req.url).replace(/[\/?&]/,'_');
    console.log('Data sent:', basename, req.body);
    let filePath = path.join(srcPath,basename);
    fs.writeFile(filePath, JSON.stringify(req.body), function(err) {
        if(err) {
            return console.log(err);
            res.status(404).send(err);
        } else {
            console.log("The file was saved!");
            res.send('saved');
        }
    });
});
app.put(/data\/.*/,function(req,res){
    let basename = path.basename(req.url).replace(/[\/?&]/,'_');
    console.log('Data sent:', basename, req.body);
    let filePath = path.join(srcPath,basename);
    fs.writeFile(filePath, JSON.stringify(req.body), function(err) {
        if(err) {
            return console.log(err);
            res.status(404).send(err);
        } else {
            console.log("The file was saved!");
            res.send('saved');
        }
    });
});
app.use('/data/',testClient);

app.listen(port, function () {
    console.log('Server running on ' + port + '...');
})
