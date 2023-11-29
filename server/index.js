require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const colors = require('colors');
const connectDB = require('./config/db')

const port = process.env.PORT || 8080;
const app = express();

connectDB()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'DEVELOPMENT' ? true : false
}))

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

