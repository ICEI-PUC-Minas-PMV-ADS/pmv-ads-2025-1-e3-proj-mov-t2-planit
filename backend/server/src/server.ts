import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import express from "express"
import { readFileSync } from "fs";

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const json = JSON.parse(readFileSync('../backend/auth.json', 'utf8'));

initializeApp({
  credential: cert(json),
});

const db = getFirestore();

// 👏

db
  .collection('users')
  .get()
  .then((snapshot) => 
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  )