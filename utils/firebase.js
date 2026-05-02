/**
 * firebase.js - Firebase initialization and helpers
 *
 * Handles all Firebase database operations for storing quotes.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initialize Firebase app
 * This runs once when the module is imported
 */
const app = initializeApp(firebaseConfig);

/**
 * Initialize Firestore database
 * This is where all quote data will be stored
 */
export const db = getFirestore(app);

/**
 * Save a quote to Firebase Firestore
 *
 * @param {Object} quoteData - The quote information to save
 * @returns {Promise<string>} - The document ID of the saved quote
 */
export const saveQuoteToFirebase = async (quoteData) => {
    try {
        // Add document to "quotes" collection with automatic ID
        const docRef = await addDoc(collection(db, "quotes"), {
            ...quoteData,
            createdAt: serverTimestamp(), // Firestore server timestamp
            status: "pending", // Quote starts as pending
        });

        console.log("Quote saved with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving quote:", error);
        throw new Error("Failed to save quote to database");
    }
};