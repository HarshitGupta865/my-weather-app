const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

//Server runs at port 3000
const port = process.env.PORT || 3000;

//public static path
const static_path = path.join(__dirname, '../public');

//template_path contains the path upto view directory
const template_path = path.join(__dirname, '../templates/views');

//partials_path contains the path upto partials directory
const partials_path = path.join(__dirname, '../templates/partials');

// To tell express that we now have views directory
app.set('view engine', 'hbs');

//To tell express that the path of views folder is changed
app.set('views', template_path);

//To tell express that hbs is now considering partials as well
hbs.registerPartials(partials_path);

//To unable the app to execute static files
app.use(express.static(static_path));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/weather', function (req, res) {
  res.render('weather');
});

app.get('*', function (req, res) {
  res.render('error', {
    errorHeader: '404',
    errorPara: "Sorry, the page you searched for can't be found !",
  });
});

app.listen(port, function () {
  console.log(`Server running at port ${port}`);
});
