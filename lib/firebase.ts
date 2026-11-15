import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const required = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"] as const;

function hasConfig(config: FirebaseOptions) {
  return required.every((key) => Boolean(config[key]));
}

function firebaseApp() {
  if (!hasConfig(firebaseConfig)) return null;
  if (getApps().length) return getApp();
  return initializeApp(firebaseConfig);
}

export function getDb(): Firestore | null {
  const app = firebaseApp();
  return app ? getFirestore(app) : null;
}

export function getFirebaseAuth(): Auth | null {
  const app = firebaseApp();
  return app ? getAuth(app) : null;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  const app = firebaseApp();
  return app ? getStorage(app) : null;
}

let analytics: Analytics | null = null;

export async function getFirebaseAnalytics() {
  if (typeof window === "undefined") return null;
  const app = firebaseApp();
  if (!app) return null;
  if (analytics) return analytics;
  if (!(await isSupported())) return null;
  analytics = getAnalytics(app);
  return analytics;
}
