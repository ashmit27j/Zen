// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
	apiKey: "AIzaSyAn-bxppYcPVvlAf9ztIM719WENvGRBS98",
	authDomain: "zenapp-4b394.firebaseapp.com",
	projectId: "zenapp-4b394",
	storageBucket: "zenapp-4b394.appspot.com",
	messagingSenderId: "83452988219",
	appId: "1:83452988219:web:5ac40300170ea373ae851e",
	measurementId: "G-2HJ942TBRS",
};

const app = initializeApp(firebaseConfig);

// ✅ Only enable analytics if supported (avoids SSR errors in Next.js)
let analytics;
if (typeof window !== "undefined") {
	isSupported().then((yes) => {
		if (yes) analytics = getAnalytics(app);
	});
}

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ NEW: export Firestore instance
export default app;
