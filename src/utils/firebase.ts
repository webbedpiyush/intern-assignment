import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

const serviceAccount = require("../../secret.json") as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();
