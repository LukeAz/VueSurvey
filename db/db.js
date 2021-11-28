const sqlite3 = require('sqlite3');
const fs = require('fs');

function getDbSession () {
  let db = new sqlite3.Database('./db/surveys.db');
  db.run("PRAGMA foreign_keys = ON");
  return db; 
}

function resolveObject(list) {
  let objects = {};
  (list || []).forEach((item) => {
    objects[item.id] = item;
  });
  return objects;
}

module.exports = {
  initialize: () => {
    if(!fs.existsSync('./db/surveys.db')) {
      let db = getDbSession();
      db.serialize(() => {
        db.exec(fs.readFileSync('./db/schema.sql', 'utf-8'));
        db.close();
      });
    }
  },
  addSurvey: (id, username, name) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.get('INSERT INTO surveys (id, username, name, json) VALUES (?, ?, ?, "{}")', id, username, name, (err) => {
        db.close();
        if(err)
          reject(err);
        else
          resolve(); 
      });
    });
  },
  getSurveys: (username) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.all('SELECT id, name, json FROM surveys WHERE username = ?', username, (err, result) => {
        db.close();
        if(err)
          reject(err);
        else
          resolve(resolveObject(result));
      })
    });
  },
  getSurvey: (surveyId) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.get('SELECT json FROM surveys WHERE id = ?', surveyId, (err, survey) => {
        db.close();
        if(err || survey == null)
          reject(err);
        else
          resolve(JSON.parse(survey.json));
      })
    });
  },
  getName: (surveyId) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.get('SELECT name FROM surveys WHERE id = ?', surveyId, (err, survey) => {
        db.close();
        if(err || survey == null)
          reject(err);
        else
          resolve(survey.name);
      })
    });
  },
  storeSurvey: (username, id, json) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.run('UPDATE surveys SET json = ? WHERE id = ? AND username = ?', json, id, username, (err) => {
        db.close();
        if(err)
          reject(err);
        else
          resolve();
      });
    });
  },
  changeName: (username, id, name) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.run('UPDATE surveys SET name = ? WHERE id = ? AND username = ?', name, id, username, (err) => {
        db.close();
        if(err)
          reject(err);
        else
          resolve();
      });
    });
  },
  deleteSurvey: (username, surveyId) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.run('DELETE FROM surveys WHERE id = ? AND username = ?', surveyId, username, (err) => {
        db.close();
        if(err)
          reject(err);
        else
          resolve();
      });
    });
  },
  postResults: (postId, json) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.run('INSERT INTO results (postid, json) VALUES(?, ?)', postId, json, (err) => {
        db.close();
        if(err)
          reject(err);
        else
          resolve();
      })
    });
  },
  getResults: (username, postId) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.all('SELECT results.json FROM results JOIN surveys ON postid = surveys.id WHERE postid = ? AND username = ? ', postId, username, (err, data) => {
        db.close();
        if(err) {
          reject(err);
        } else {
          resolve((data || []).map((item) => {
            return JSON.parse(item.json);
          }));
        }
      })
    });
  },
  createAccount: (username, hash) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.run('INSERT INTO users (username,  password) VALUES (?, ?)', username, hash, (err) => {
        db.close();
        if(err) 
          reject(err);
        else
          resolve();
      });
    });
  },
  getUserPassword: (username) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.get('SELECT username, password FROM users WHERE username = ?', username, (err, user) => {
        db.close();
        if(err || user === undefined || user == null)
          reject(err);
        else
          resolve(user.password);
      });
    });
  },
  getUserData: (username) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.get('SELECT username FROM users WHERE username = ?', username, (err, user) => {
        db.close();
        if(err || user === undefined || user == null) 
          reject(err);
        else
          resolve(user);
      });
    });
  },
  updatePassword: (username, hash) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.run('UPDATE users SET password = ? WHERE username = ?', hash, username, (err) => {
        db.close();
        if(err)
          reject(err);
        else
          resolve();
      });
    });
  },
  deleteAccount: (username) => {
    return new Promise((resolve, reject) => {
      let db = getDbSession();
      db.run('DELETE FROM users WHERE username = ?', username, (err) => {
        db.close();
        if(err)
          reject(err);
        else
          resolve();
      });
    });
  }
}