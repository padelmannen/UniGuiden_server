const sqlite3 = require('sqlite3').verbose();
const accountsDB = require ('../databases/dbCreator'); // Använd rätt databasfil

function addUniStudentProfile(email, name, age, uniID, programID, year, city, callback) {
  let userid;

  // Lägg till användaren i loginsDB och få det genererade id-värdet
  const stmt1 = accountsDB.prepare("SELECT id FROM logins WHERE email = ?");
  stmt1.get(email, function (err, row) {
    if (err) {
      callback(err, null);
    } else if (row) {
      userid = row.id;

      // Använd samma id för att lägga till användaren i accountsDB
      const stmt2 = accountsDB.prepare("INSERT INTO uniStudents (id, email, name, age, universityID, programID, year, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

      stmt2.run(userid, email, name, age, uniID, programID, year, city, function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { success: true, message: 'Användaren har lagts till i databasen för studenter' });
        }
      });
    }
  });
}

function addHighschoolStudentProfile(email, name, birthdate, highschool, education, city, callback) {
  let userid;

  // Lägg till användaren i loginsDB och få det genererade id-värdet
  const stmt1 = accountsDB.prepare("SELECT id FROM logins WHERE email = ?");
  stmt1.get(email, function (err, row) {
    if (err) {
      callback(err, null);
    } else if (row) {
      userid = row.id;

      // Använd samma id för att lägga till användaren i accountsDB
      const stmt2 = accountsDB.prepare("INSERT INTO highschoolStudents (id, email, name, birthdate, highschool, education, city) VALUES (?, ?, ?, ?, ?, ?, ?)");

      stmt2.run(userid, email, name, birthdate, highschool, education, city, function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { success: true, message: 'Användaren har lagts till i databasen för gymasaiestudenter' });
        }
      });
    }
  });
}

function getAllUniStudents(callback) {
  accountsDB.serialize(() => {
    const query = `
      SELECT uniStudents.*, universities.name AS universityName
      FROM uniStudents
      LEFT JOIN universities ON uniStudents.universityID = universities.id
    `;

    accountsDB.all(query, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        if (rows.length > 0) {
          // If there are rows in the result, return success and the student data
          callback(null, { success: true, students: rows });
        } else {
          // If the result is empty, return success and an empty array
          callback(null, { success: true, students: [] });
        }
      }
    });
  });
};

module.exports = {
  getAllUniStudents, addUniStudentProfile, addHighschoolStudentProfile
};
