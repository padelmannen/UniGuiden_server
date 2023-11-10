const sqlite3 = require('sqlite3').verbose();
//const loginsDB = require ('../databases/logins'); // Använd rätt databasfil
const accountsDB = require('../databases/dbCreator'); // Använd rätt databasfil


function checkLogin(email, password, callback) {
  checkEmail(email, (err, emailExists) => {
    console.log("kollar email")
    if (err) {
      callback(err, null);
    } 
    else if (emailExists) {
      console.log("email fanns")

      accountsDB.serialize(() => {
        accountsDB.get("SELECT * FROM logins WHERE email = ? AND password = ?", [email, password], (err, row) => {
          if (err) {
            callback(err, null);
          } else if (row) {
            console.log("rätt inlogg")
            callback(null, { success: true, message: 'Inloggning lyckades' });
          } else {
            console.log("fel inlogg")
            callback(null, { error: 'Ogiltiga inloggningsuppgifter' });
          }
        });
      });
    } else {
      console.log("email fanns inte")

      callback(null, { error: 'Användarnamn finns ej' });
    }
  });
}

function checkEmail(email, callback) {
  accountsDB.serialize(() => {
    accountsDB.get("SELECT * FROM logins WHERE email = ?", [email], (err, row) => {
      if (err) {
        callback(err, null);
      } else if (row) {
        callback(null, true); // E-postadressen finns
      } else {
        callback(null, false); // E-postadressen finns inte
      }
    });
  });
}


function addUser(email, password, accountType, callback) {
  // Lägg till användaren i loginsDB och få det genererade id-värdet
  const stmt1 = accountsDB.prepare("INSERT INTO logins (email, password, accountType) VALUES (?, ?, ?)");
  stmt1.run(email, password,accountType, function (err) {
    if (err) {
      callback(err, null);
    } else {

      callback(null, { success: true, message: 'Användaren har lagts till i databasen' });
      /* const userId = this.lastID; // Hämta det genererade id-värdet
      // Använd samma userId för att lägga till användaren i accountsDB
      const stmt2 = accountsDB.prepare("INSERT INTO accounts (id, email, name, birthdate) VALUES (?, ?, ?, ?)");
      stmt2.run(userId, email, name, birthdate, function (err) {
        stmt1.finalize();
        stmt2.finalize();
        
        if (err) {
          callback(err, null);
        } else {
          callback(null, { success: true, message: 'Användaren har lagts till i databasen' });
        } */
    }
  });
}

module.exports = {
  checkLogin, addUser, checkEmail
};