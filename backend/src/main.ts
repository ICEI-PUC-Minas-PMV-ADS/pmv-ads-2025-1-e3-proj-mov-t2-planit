import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue, Filter } from "firebase-admin/firestore";
import express from "express"

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// aprender como ler arquivos em node.
const json = lerArquivoJsonDaSilva("../auth.json")

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