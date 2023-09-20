// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: 'bird-farm.firebaseapp.com',
  projectId: 'bird-farm',
  storageBucket: 'bird-farm.appspot.com',
  messagingSenderId: '354938172640',
  appId: '1:354938172640:web:a95179bf3090aef2a68c85',
  measurementId: 'G-6J8JT895XE'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const imageDB = getStorage(app)
