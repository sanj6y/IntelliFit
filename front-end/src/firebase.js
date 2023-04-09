import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";

import {
	getFirestore,
	setDoc,
	doc,
	addDoc,
	collection,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBwvhvUCrckWlh4EYdMwW9cIxSXIG8hvYo",
	authDomain: "intellifit-e4444.firebaseapp.com",
	projectId: "intellifit-e4444",
	storageBucket: "intellifit-e4444.appspot.com",
	messagingSenderId: "442011661166",
	appId: "1:442011661166:web:729ac6f285f8e2ce51077f",
	measurementId: "G-2HN58VNPTS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert("Invalid Email or Password");
	}
};

const register = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(doc(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			minutes: 0,
			name1: "The Ultimate Burn",
			exercises1: { pushup: "15 r", situp: "15 r", squat: "15 r" },
			lastUsed1: new Date(), 
			name2: "The Timed Burn",
			exercises2: { lunges: "15 s", dips: "15 s", plank: "15 s" },
			lastUsed2: new Date(),
			name3: "The Hard Roast",
			exercises3: { lunges: "15 r", pushup: "15 r", situp: "15 s" },
			lastUsed3: new Date(),
		});

		// await setDoc(doc(db, "users", user.uid, "workouts", "SET1"), {
		// 	name: "The Ultimate Burn",
		// 	exercises: { pushup: "15 r", situp: "15 r", squat: "15 r" },
		// 	lastUsed: new Date(),
		// });

		// await setDoc(doc(db, "users", user.uid, "workouts", "SET2"), {
		// 	name: "The Timed Burn",
		// 	exercises: { lunges: "15 s", dips: "15 s", plank: "15 s" },
		// 	lastUsed: new Date(),
		// });

		// await setDoc(doc(db, "users", user.uid, "workouts", "SET3"), {
		// 	name: "The Hard Roast",
		// 	exercises: { lunges: "15 r", pushup: "15 r", situp: "15 s" },
		// 	lastUsed: new Date(),
		// });
	} catch (err) {
		console.log(err);
		alert("There was an error creating your account");
	}
};

const forgotPassword = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent! Check spam if you don't see it");
	} catch (err) {
		alert("Invalid Email");
	}
};

const logout = () => {
	signOut(auth);
};

export { auth, db, login, register, forgotPassword, logout };
