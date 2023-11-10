const sqlite3 = require('sqlite3').verbose();
const db = require ('../databases/dbCreator'); // Använd rätt databasfil

function addUniversity(name, city, imageID, callback) {
    // Lägg till användaren i loginsDB och få det genererade id-värdet
    const stmt1 = db.prepare("INSERT INTO universities (name, city, imageID) VALUES (?, ?, ?)");
    stmt1.run(name, city, imageID, function (err) {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, { success: true, message: 'Användaren har lagts till i databasen' });
        }
    });
}


function addUniversityPost(name, description, callback) {
    console.log("inne i addUniAdd")

    const stmt1 = db.prepare("SELECT id FROM universities WHERE name = ? LIMIT 1");
    stmt1.get(name, function (err, row) {
      if (err) {
        callback(err, null);
      } else if (row) {
        uniID = row.id;
  
        // Använd samma id för att lägga till en add från ett universitet i universityAds
        const stmt2 = db.prepare("INSERT INTO universityAds (id, universityID, description) VALUES (?, ?, ?)");
  
        stmt2.run(uniID, name, description, function (err) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, { success: true, message: 'Användaren har lagts till i databasen för studenter' });
          }
        });
      }
    });
}

function getAllUniversityPosts(callback) {
    db.serialize(() => {
        db.all("SELECT universityPosts.id AS postID, universityPosts.title, universityPosts.description, universityPosts.date, universityPosts.place, universities.name AS universityName, universities.imagePath AS imagePath FROM universityPosts INNER JOIN universities ON universityPosts.universityID = universities.id;",

        (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        if (rows.length > 0) {
          console.log(rows)
          // Om det finns rader i resultatet, finns det ads
          callback(null, { success: true, posts: rows });
        } else {
          // Om resultatet är tomt, finns det inga ads
          callback(null, { success: true, posts: [] });
        }
      }
    });
  });
}

function getAllUniversites(callback) {
  console.log("hämtar")
  db.serialize(() => {
    db.all("SELECT * FROM universities", (err, rows) => {
      if (err) {
        console.log("err");
        callback(err, null);
      } else {
        if (rows.length > 0) {
          console.log("massa unis");
          //console.log(rows)
          // Om det finns rader i resultatet, finns det ads
          callback(null, { success: true, universities: rows });
        } else {
          // Om resultatet är tomt, finns det inga ads
          console.log("inga unis");
          callback(null, { success: true, universities: [] });
        }
      }
    });
  });  
}
module.exports = {
    getAllUniversityPosts,
    addUniversity,
    addUniversityPost,
    getAllUniversites
};
