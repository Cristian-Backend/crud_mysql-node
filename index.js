import express from 'express';
import indexRoutes from './routes/index.routes.js'
import conexionDB from './database/db.js';

const app = express();


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.json());


app.use(express.json())

app.use('/', indexRoutes)


app.listen(3000,()=> {
    conexionDB()
    console.log('Server is running on port 3000');
})