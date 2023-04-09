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
    apiKey: "AIzaSyCxyJ6MXTn1JFbZP81kIVvHxwTd0Oq6Dq4",
    authDomain: "intel-fit.firebaseapp.com",
    projectId: "intel-fit",
    storageBucket: "intel-fit.appspot.com",
    messagingSenderId: "223676316026",
    appId: "1:223676316026:web:b49bcb91f3e1f238747ec3",
    measurementId: "G-X8Y469F32Q"
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
