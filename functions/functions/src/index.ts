import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello from Express + Firebase Functions!');
});

app.post('/data', async (req, res) => {
  const body = req.body;

  try {
    const db = admin.firestore();
    const result = await db.collection('usuarios').add(body);
    res.status(200).json({ status: 'ok', id: result.id });
  } catch (error) {
    res.status(500).json({ status: 'error', message: String(error) });
  }
});

export const api = functions.https.onRequest(app);
