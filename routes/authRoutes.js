const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Lägg till crypto-modulen
const router = express.Router();
const {checkLogin, addUser, checkEmail} = require('../controllers/accountsController.js');
const secretKey = crypto.randomBytes(32).toString('hex');


router.get('/', (req, res) => {
  // Här kan du skicka tillbaka en välkomstsida eller annan information
  console.log('Accessing the secret section ...')

  res.send('Välkommen till servern');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid request. Please provide email and password.' });
  }

  checkLogin(email, password, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error checking login credentials' });
    }

    // Kontrollera om inloggningen var framgångsrik
    if (data.success) {
      const token = generateJWT(data.user); // Använd data.user här om det behövs
      // Skicka bara success och message till klienten
      return res.json({ success: data.success, message: data.message, token, user: data.user, role: data.role});
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

router.post('/checkEmailexist', (req, res) => {  //Funktion kollar om användarens email är ok
  const { email, password, name, birthdate } = req.body;

  // Kontrollera om e-postadressen redan finns
  checkEmail(email, (err, emailExists) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error checking email' });
    }

    if (emailExists) {
      return res.status(200).json({ error: "email finns"});
    } else {
      // Lägg till användaren om e-postadressen inte finns
      console.log("email finns int eregistred")
      return res.status(400).json({ error: "email finns inte registrerad"});
      };
    })
});



router.post('/addLogin', (req, res) => {
  const { email, password, accountType} = req.body;

  // Kontrollera om e-postadressen redan finns
  checkEmail(email, (err, emailExists) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error checking email' });
    }

    if (emailExists) {
      return res.status(400).json({ error: 'E-postadressen är redan registrerad' });
    } else {
      // Lägg till användaren om e-postadressen inte finns
      console.log("lägger till konto")
      addUser(email, password, accountType, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error adding user credentials' });
        }
        res.json(data);
      });
    }
  });
});

function generateJWT(user) {
  const token = jwt.sign({ userId: user.id, email: user.email, role: user.accountType }, secretKey, { expiresIn: '1h' });
  return token;
}

module.exports = router;
