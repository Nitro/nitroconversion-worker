const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const compression = require('compression');

const app = express();
const payLoadLimit = '50mb';

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit:`${payLoadLimit}`}));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({limit:`${payLoadLimit}`}));
app.use(bodyParser.urlencoded({limit:`${payLoadLimit}`,extended: true,parameterLimit:5000000}));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.set('port', process.env.PORT || 5000);

const PORT = app.get('port');
app.listen(PORT, () => {
    console.log(`Conversion Site API Ready at PORT ${PORT}`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    const resStatus = err.status ? err.status : 500;
    console.log(err.message);
    res.status(resStatus).send(`Whoops, you have come across a ${resStatus} error type 😬`);
});


module.exports = app;
