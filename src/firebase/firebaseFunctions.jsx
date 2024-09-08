import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { auth } from './firebaseConfig';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, onAuthStateChanged,
    updateProfile
} from 'firebase/auth';

const firestore = getFirestore();
const Products = collection(firestore, 'Products')


async function addDocument(data) {
    try {

        const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
        data.uid = res.user.uid
        const userDocRef = doc(firestore, 'User', data.uid);
        await setDoc(userDocRef, data);
        updateProfile(res.user, { displayName: data.name })

    } catch (error) {
        console.error("Error adding document:", error);
    }
}

async function isUserExist(email, password) {
    try {
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const firestore = getFirestore();
        const userDocRef = doc(collection(firestore, 'User'), userCredential.user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        return userData
    } catch (err) {
        return false
    }

}

async function onAuthChangeFunction(setUserData) {
    onAuthStateChanged(auth, async (user) => {
        setUserData(user)
    })
}

async function Logout() { auth.signOut();window.location.href = '/login' }


async function addProduct(details, Image, uid) {
    const storage = getStorage()
    const storageRef = ref(storage, '/productImages/' + Image.name);

    const snapshot = await uploadBytes(storageRef, Image);
    const downloadURL = await getDownloadURL(snapshot.ref);

    details.Date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    details.Image = downloadURL
    details.userId = uid
    const coll = collection(firestore, "Products")
    console.log(coll)
    await addDoc(coll, details)

}


async function getProducts() {
    const products = [];
    const result = await getDocs(Products)
    result.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
    });
    return products
}


const isLoggedIn = async () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

async function getProduct(id) {
    console.log(id, "from get Product");
    const documentRef = doc(firestore, "Products", id);
    const documentSnapshot = await getDoc(documentRef);
    return documentSnapshot.data();
}

async function getUser(userId) {
    const documentRef = doc(firestore, "User", userId);
    const documentSnapshot = await getDoc(documentRef);
    return documentSnapshot.data();
}


export {
    addDocument, isUserExist, onAuthChangeFunction, Logout,
    addProduct, getProducts, isLoggedIn, getProduct, getUser
}