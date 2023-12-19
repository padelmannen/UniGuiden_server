const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('uniGuiden.db');

db.serialize(() => {
  // Skapa tabellen "accounts" om den inte finns
    db.run("CREATE TABLE IF NOT EXISTS logins (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, accountType TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS universities (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, city TEXT, imagePath TEXT, uniDescription TEXT)"); 
    db.run("CREATE TABLE IF NOT EXISTS universityPosts (id INTEGER PRIMARY KEY AUTOINCREMENT, universityID INTEGER, title TEXT, description TEXT, date TEXT, place TEXT, FOREIGN KEY(universityID) REFERENCES universities(id))");
    db.run("CREATE TABLE IF NOT EXISTS savedPosts (id INTEGER PRIMARY KEY, userID INTEGER, postID INTEGER, FOREIGN KEY(userID) REFERENCES highSchoolStudents(id), FOREIGN KEY(postID) REFERENCES universityPosts(id) )");  
    db.run("CREATE TABLE IF NOT EXISTS uniStudents (id INTEGER PRIMARY KEY, email TEXT, name TEXT, age INTEGER, universityID TEXT, programID TEXT, year INTEGER, city TEXT, imagePath TEXT, FOREIGN KEY(id) REFERENCES logins(id),FOREIGN KEY(universityID) REFERENCES universities(id) )");
    db.run("CREATE TABLE IF NOT EXISTS highSchoolStudents (id INTEGER PRIMARY KEY, email TEXT, name TEXT, birthdate TEXT, highschool TEXT, education TEXT, city TEXT,imagePath TEXT, FOREIGN KEY(id) REFERENCES logins(id))");

    /* db.run ("INSERT INTO universities (name, city, imagePath, uniDescription) VALUES ('KTH', 'Stockholm', 'images/uniLogos/kth.png', 'bra universitet')");
    db.run ("INSERT INTO universities (name, city, imagePath, uniDescription) VALUES ('Chalmers', 'Göteborg', 'images/uniLogos/chalmers.png','hyfsat universitet')");
    db.run("INSERT INTO universityPosts (universityID, title, description, date, place) VALUES ('1', 'titletest', 'beskrivning', '2023-test', 'testplats')");
    db.run("INSERT INTO universityPosts (universityID, title, description, date, place) VALUES ('2', 'göteborg title', 'göteborg beskrivning', '2023-test göteborg', 'testplats i göteborg')"); */
    /* db.run("INSERT INTO uniStudents (email, name, age, universityID, programID, year, city, imagePath) VALUES ('julia@mejl.se', 'Julia Stopner', 24, '1', 'programidTest', 5, 'Stockholm', 'images/profilePictures/julia.png')")
    db.run("INSERT INTO uniStudents (email, name, age, universityID, programID, year, city, imagePath) VALUES ('carl-åke@mejl.se', 'Carl-Åke Willberg', 25, '1', 'programidTest', 5, 'Stockholm', 'images/profilePictures/carl-åke.png')")
    db.run("INSERT INTO uniStudents (email, name, age, universityID, programID, year, city, imagePath) VALUES ('fredrik@mejl.se', 'Fredrik Strandberg', 25, '1', 'programidTest', 5, 'Stockholm', 'images/profilePictures/fredrik2.png')")
    db.run("INSERT INTO uniStudents (email, name, age, universityID, programID, year, city, imagePath) VALUES ('jesper@mejl.se', 'Jesper Senke', 25, '1', 'programidTest', 5, 'Stockholm', 'images/profilePictures/jesper.png')")
    db.run("INSERT INTO uniStudents (email, name, age, universityID, programID, year, city, imagePath) VALUES ('test@mejl.se', 'Test Testsson', 22, '1', 'programidTest2', 2,'Stockholm', 'images/profilePictures/profileImage.png')")
 */

  });

module.exports = db;
