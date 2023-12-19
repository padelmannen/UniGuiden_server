const sqlite3 = require('sqlite3').verbose();
//const loginsDB = require ('../databases/logins'); // Använd rätt databasfil
const accountsDB = require('../databases/dbCreator'); // Använd rätt databasfil

function checkLogin(email, password, callback) {
  checkEmail(email, (err, emailExists) => {
    console.log("kollar email");
    if (err) {
      callback(err, null);
    } else if (emailExists) {
      console.log("email fanns");

      // Steg 1: Hämta grundläggande användaruppgifter från logins-tabellen
      const query = "SELECT * FROM logins WHERE email = ? AND password = ?";
      accountsDB.get(query, [email, password], (err, basicUserInfo) => {
        if (err) {
          callback(err, null);
        } else if (basicUserInfo) {
          console.log("rätt inlogg");

          // Steg 2: Beroende på accountType, hämta ytterligare information från relevant tabell
          const userInfoQuery = (basicUserInfo.accountType === 'highschool')
            ? "SELECT * FROM highSchoolStudents WHERE id = ?"
            : "SELECT * FROM uniStudents WHERE id = ?";

          accountsDB.get(userInfoQuery, [basicUserInfo.id], (err, detailedUserInfo) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, { success: true, message: 'Inloggning lyckades', user: detailedUserInfo, role: basicUserInfo.accountType});
            }
          });
        } else {
          console.log("fel inlogg");
          callback(null, { error: 'Ogiltiga inloggningsuppgifter' });
        }
      });
    } else {
      console.log("email fanns inte");
      callback(null, { error: 'Användarnamn finns ej' });
    }
  });
}


function checkEmail(email, callback) {
  accountsDB.serialize(() => {
    accountsDB.get("SELECT * FROM logins WHERE email = ?", [email], (err, user) => {
      if (err) {
        callback(err, null);
      } else if (user) {
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