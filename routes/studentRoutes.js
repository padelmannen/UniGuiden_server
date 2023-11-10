const express = require('express');
const router = express.Router();
const {getAllUniStudents, addUniStudentProfile, addHighschoolStudentProfile } = require('../controllers/studentsController.js');

router.get('/getStudents', (req, res) => {

  getAllUniStudents((err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error getting students' });
    }
    console.log(data)

    res.json(data);
  });
});

router.post('/addProfile', (req, res) => {
  
  const { email, name, birthdate, highschool, education, city, accountType} = req.body;
  console.log(accountType)
  if (accountType == "highschool"){
    addHighschoolStudentProfile(email, name, birthdate, highschool, education, city, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error adding HS student' });
      }
      res.json(data);
    });
  }
  if (accountType == "university"){
    const age = 25;
    const uniID = "KTH";
    const programID = "Indek";
    const city = "Stockholm";
    const year = 5;
    addUniStudentProfile(email, name, age, uniID, programID, year, city, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error adding Unistudent' });
      }
      res.json(data);
    });
  }
});






module.exports = router;
