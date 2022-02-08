const Database = require('better-sqlite3');
const fs = require('fs');

const getDbSession = async () => {
  let db = new Database('./db/surveys.db');
  await db.prepare("PRAGMA foreign_keys = ON").run();
  return db; 
}
const resolveObject = (list) => {
  let objects = {};
  (list || []).forEach((item) => {
    objects[item.id] = item;
  });
  return objects;
}

module.exports = {
  initialize: async () => {
    if(!fs.existsSync('./db/surveys.db')) {
      let db = await getDbSession();
      await db.exec(fs.readFileSync('./db/schema.sql', 'utf-8'));
      db.close();
    }
  },
  addSurvey: async (id, username, name) => {
    let db = await getDbSession();
    try {
      let sql = "INSERT INTO surveys (id, username, name, json) VALUES (?, ?, ?, '{}')";
      await db.prepare(sql).run(id, username, name);
    } catch {throw {name: "failed-add-survey"}} finally {db.close();}
  },
  getSurveys: async (username) => {
    let db = await getDbSession();
    try {
      let sql = "SELECT id, name, json FROM surveys WHERE username = ?";
      return resolveObject(await db.prepare(sql).all(username));
    } catch {throw {name: "failed-get-surveys"}} finally {db.close();}
  },
  getSurvey: async (surveyId) => {
    let db = await getDbSession();
    try {
      let sql = "SELECT json FROM surveys WHERE id = ?";
      return JSON.parse((await db.prepare(sql).get(surveyId)).json);
    } catch {throw {name: "failed-get-survey"}} finally {db.close();}
  },
  getName: async (surveyId) => {
    let db = await getDbSession();
    try {
      let sql = "SELECT name FROM surveys WHERE id = ?";
      return (await db.prepare(sql).get(surveyId)).name;
    } catch {throw {name: "failed-get-name"}} finally {db.close();}
  },
  storeSurvey: async (username, id, json) => {
    let db = await getDbSession();
    try {
      let sql = "UPDATE surveys SET json = ? WHERE id = ? AND username = ?";
      await db.prepare(sql).run(json, id, username);
    } catch {throw {name: "failed-store-survey"}} finally {db.close();}
  },
  changeName: async (username, id, name) => {
    let db = await getDbSession();
    try {
      let sql = "UPDATE surveys SET name = ? WHERE id = ? AND username = ?";
      await db.prepare(sql).run(name, id, username);
    } catch {throw {name: "failed-change-survey-name"}} finally {db.close();}
  },
  deleteSurvey: async (username, surveyId) => {
    let db = await getDbSession();
    try {
      let sql = "DELETE FROM surveys WHERE id = ? AND username = ?";
      await db.prepare(sql).run(surveyId, username);
    } catch {throw {name: "failed-delete-survey"}} finally {db.close();}
  },
  postResults: async (postId, json) => {
    let db = await getDbSession();
    try {
      let sql = "INSERT INTO results (postid, json) VALUES(?, ?)";
      await db.prepare(sql).run(postId, json);
    } catch {throw {name: "failed-add-survey-result"}} finally {db.close();}
  },
  getResults: async (username, postId) => {
    let db = await getDbSession();
    try {
      let sql = "SELECT results.json FROM results JOIN surveys ON postid = surveys.id WHERE postid = ? AND username = ?";
      let results = await db.prepare(sql).all(postId, username);
      return (results || []).map((item) => {
        return JSON.parse(item.json);
      });
    } catch {throw {name: "failed-get-results"}} finally {db.close();}
  },
  createAccount: async (username, hash) => {
    let db = await getDbSession();
    try {
      let sql = "INSERT INTO users (username,  password) VALUES (?, ?)";
      await db.prepare(sql).run(username, hash);
    } catch {throw {name: "failed-add-user"}} finally {db.close();}
  },
  getUserPassword: async (username) => {
    let db = await getDbSession();
    try {
      let sql = "SELECT password FROM users WHERE username = ?";
      let user = await db.prepare(sql).get(username);
      return user.password;
    } catch {throw {name: "failed-get-results"}} finally {db.close();}
  },
  getUserData: async (username) => {
    let db = await getDbSession();
    try {
      let sql = "SELECT username FROM users WHERE username = ?";
      let user = await db.prepare(sql).get(username);
      return user;
    } catch {throw {name: "failed-get-user-data"}} finally {db.close();}
  },
  updatePassword: async (username, hash) => {
    let db = await getDbSession();
    try {
      let sql = "UPDATE users SET password = ? WHERE username = ?";
      await db.prepare(sql).run(hash, username);
    } catch {throw {name: "failed-update-password"}} finally {db.close();}
  },
  deleteAccount: async (username) => {
    let db = await getDbSession();
    try {
      let sql = "DELETE FROM users WHERE username = ?";
      await db.prepare(sql).run(username);
    } catch {throw {name: "failed-delete-account"}} finally {db.close();}
  }
}