const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Insta = require('./models/insta.js');
const db = mongoose.connection;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));
//route
app.use('/profile',require('./routes/profile.js'))
//css
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/insta', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongo')
});
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})