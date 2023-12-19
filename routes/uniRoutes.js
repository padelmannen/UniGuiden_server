const express = require('express');
const router = express.Router();
const {getAllUniversityPosts, addUniversity, addUniversityAdd, getAllUniversites} = require('../controllers/universitiesController.js');
//const imageFolder = require('../index');
//const imageFolder = 'D:/Users/Jesper/KTH/Startup/Server/images'; // Uppdatera detta med den faktiska sökvägen till mappen där dina bilder ligger
const imageFolder="http://10.0.2.2:3000/"
router.get('/getUniversityPosts', (req, res) => {

    getAllUniversityPosts((err, posts) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error getting posts' });
    }
    console.log(posts)
    posts.posts.forEach(post => {
      post.imagePath = imageFolder + post.imagePath;
    });
    console.log(posts)
    res.json(posts);
  });
});

const path = require('path');

router.get('/getUniversities', (req, res) => {
  console.log("Hämtar universitet");

  getAllUniversites((err, universities) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Fel vid hämtning av universitet' });
    }
    console.log(universities);
    console.log("efter logga unis")

    // Gå igenom varje universitet och bygg fullständig bildsökväg
    universities.universities.forEach(university => {
      university.imagePath = imageFolder + university.imagePath;
      university.website = "test.se"
    });

    
    console.log(universities);
    res.json(universities);
  });
});


router.post('/addUniversity', (req, res) => {
 const {name, city} = req.body;

  let imageID="test"

  addUniversity(name, city, imageID, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error adding university' });
    }
    res.json(data);
  });
});

router.post('/addUniversityAdd', (req, res) => {
    const {name, description } = req.body;
    
    addUniversityAdd(name, description, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error adding student' });
      }
      res.json(data);
    });
  });






module.exports = router;
