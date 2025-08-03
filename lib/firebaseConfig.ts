// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAn-bxppYcPVvlAf9ztIM719WENvGRBS98",
	authDomain: "zenapp-4b394.firebaseapp.com",
	projectId: "zenapp-4b394",
	storageBucket: "zenapp-4b394.appspot.com", // ✅ fix storage bucket domain
	messagingSenderId: "83452988219",
	appId: "1:83452988219:web:5ac40300170ea373ae851e",
	measurementId: "G-2HJ942TBRS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Only enable analytics if supported (avoids SSR errors in Next.js)
let analytics;
if (typeof window !== "undefined") {
	isSupported().then((yes) => {
		if (yes) analytics = getAnalytics(app);
	});
}

// ✅ Export auth
export const auth = getAuth(app);
export default app;
