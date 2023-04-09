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
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			minutes: 0,
		});
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
