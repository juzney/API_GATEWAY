const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const httpProxy = require('express-http-proxy')
const helmet = require('helmet')
const app = express();


app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	app.use(cors());
	next();
});


/*let ALLOWED_ORIGINS = ["http://serverabc.com", "http://localhost:8080"];
app.use((req, res, next) => {
    let origin = req.headers.origin;
    let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
    res.header("Access-Control-Allow-Origin", theOrigin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
})*/


app.use('/insta', httpProxy('http://localhost:3001'))
app.use('/product', httpProxy('http://localhost:3003'))





const PORT = process.env.PORT || 3005;
app.listen(PORT, ()=> console.log("API gateway server running on PORT" + " " +PORT))


