const express = require('express');
const mongoose = require('mongoose');
const empRoutes = require('./routes/empRoutes');
const leaveRoutes = require('./routes/leaveroutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/EmployeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Middleware
app.use(express.json());
app.use('/api', empRoutes);
app.use('/api', leaveRoutes);
app.use('/', require('./routes/basicroutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
