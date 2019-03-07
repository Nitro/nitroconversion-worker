const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');

const app = express();
const payLoadLimit = '50mb';

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit:`${payLoadLimit}`}));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({limit:`${payLoadLimit}`}));
app.use(bodyParser.urlencoded({limit:`${payLoadLimit}`,extended: true,parameterLimit:5000000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.set('port', process.env.PORT || 5000);

const PORT = app.get('port');
app.listen(PORT, () => {
    console.log(`Conversion Site API Ready at PORT ${PORT}`);
});


module.exports = app;
