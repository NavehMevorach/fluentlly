import firebase from "firebase/app"
import config from "./firebase.config"

import "firebase/firestore"

const app = firebase.initializeApp(config)

export const db = app.firestore()

export default app