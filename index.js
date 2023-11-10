// Importera och använd dina moduler här
var express = require('express');
var app = express();
const port = 3000;
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const uniRoutes = require('./routes/uniRoutes');
const {addUniversityAdd} = require('./controllers/universitiesController.js');
const path = require('path');

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use(express.json());


/* console.log("innan")
app.use((req, res, next) => {
  console.log('Server is starting...');

  // Kör addUniversityAdd-funktionen här
  addUniversityAdd("KTH", "detta är en text som beskriver eventet", (err, result) => {
    if (err) {
      console.error('Error while adding university ad:', err);
    } else {
      console.log('University ad added successfully:', result);
    }
  });
  next(); // Fortsätt till dina rutter
});
console.log("efter") */

// Använd dina rutter
app.use(authRoutes);
app.use(studentRoutes);
app.use(uniRoutes);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

