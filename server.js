let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let {mongoURI, port} = require('./configs/config')
let cors = require('cors')
let app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(conn => console.log("mongodb connected"))
        .catch(err => console.log(err))

const userRoutes = require('./routes/users')
const eventRoutes = require('./routes/events')

app.use('/api/user', userRoutes)
app.use('/api/event', eventRoutes)

app.listen(port, () => console.log(`server started at port ${port}`))