require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const getConnection = require('./utils/getConnection');
const errorHandler = require('./middlewares/errorHandler');
const galaryRoutes = require('./routes/galary')
const path = require('path')


const accountRoutes = require('./routes/account')







const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended:false}))
app.use('/images',express.static(path.join(__dirname,'images')))

app.use('/user',accountRoutes)
app.use('image',galaryRoutes)









app.use(errorHandler)
getConnection()
app.listen(process.env.PORT, ()=>
    console.log('server is listening on port: ${process.env.PORT}' )
    );

    

