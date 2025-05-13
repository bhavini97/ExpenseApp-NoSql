const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const loginSignUpRoutes = require('./routes/loginSignUp');
const expRouter = require('./routes/expenseRoutes');
const orderRouter = require('./routes/orderRoutes');
const forgotpasswordRouter = require('./routes/forgetPassword');
const premiumRoutes = require('./routes/premiumTable');
const {connectToMongo} = require('./util/database')
require('dotenv').config()
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

// write logging data in this file
const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags :'a'}
)

app.use(morgan('combined',{stream:accessLogStream}))

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"public","landingPage.html"))
})

app.use('/expense',expRouter);

app.use('/auth',loginSignUpRoutes);

app.use('/payment',orderRouter);

app.use('/premium',premiumRoutes);

app.use('/password',forgotpasswordRouter);

 
const startServer = async () => {
  try {
    await connectToMongo(); // await DB connection
       
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
  }
};

startServer();