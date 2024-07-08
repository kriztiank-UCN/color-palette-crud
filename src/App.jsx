// How to set up React with Firebase/Firestore v9 (Part 4 | deleteDoc & query delete)
// https://youtu.be/uVPtYLGPL80

import {
  onSnapshot,
  collection,
  addDoc,
  // setDoc, overwrites the whole thing, updateDoc only updates the fields that you specify
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "./firebase"

const Dot = ({ color }) => {
  const style = {
    height: 25,
    width: 25,
    margin: "0px 10px",
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block",
  }
  return <span style={style}></span>
}

export default function App() {
  const [colors, setColors] = useState([{ name: "Loading...", id: "initial" }])
  // console.log(colors)

  // Fetch realtime data from Firestore without order
  // useEffect(
  //   () =>
  //     // db: handle to Database, colors: collection name
  //     onSnapshot(
  //       collection(db, "colors"),
  //       // callback function with snapshot from the database
  //       // Return the data and the id, manually with a custom property, from the database
  //       snapshot => setColors(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  //     ),
  //   []
  // )

  // Fetch realtime data from Firestore, with orderBy by timestamp
  useEffect(() => {
    const collectionRef = collection(db, "colors")
    const q = query(collectionRef, orderBy("timestamp", "desc"))

    const unsub = onSnapshot(q, snapshot =>
      setColors(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    )
    return () => unsub()
  }, [])

  const handleNew = async () => {
    const name = prompt("Enter color name")
    const value = prompt("Enter color value")

    const collectionRef = collection(db, "colors")
    const payload = { name, value, timestamp: serverTimestamp() }
    // await addDoc(collectionRef, payload)
    const docRef = await addDoc(collectionRef, payload)
    console.log("The new ID is: " + docRef.id)
  }

  const handleEdit = async id => {
    const name = prompt("Enter color name")
    const value = prompt("Enter color value")

    const docRef = doc(db, "colors", id)
    const payload = { name, value, timestamp: serverTimestamp() };

    updateDoc(docRef, payload)
    console.log(id)
  }

  const handleDelete = async id => {
    const docRef = doc(db, "colors", id)
    await deleteDoc(docRef)
  }

  const handleQueryDelete = async () => {
    const userInputName = prompt("Enter color name")

    const collectionRef = collection(db, "colors")
    const q = query(collectionRef, where("name", "==", userInputName))
    const snapshot = await getDocs(q)

    const results = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    // console.log(results)

    results.forEach(async result => {
      const docRef = doc(db, "colors", result.id)
      await deleteDoc(docRef)
    })
  }

  return (
    <div className="root">
      <button className="button" onClick={handleNew}>
        New
      </button>
      <button className="button" onClick={handleQueryDelete}>
        Query Delete
      </button>

      <ul>
        {colors.map(color => (
          <li key={color.id}>
            <button className="button2" onClick={() => handleEdit(color.id)}>
              edit
            </button>
            <button className="button2" onClick={() => handleDelete(color.id)}>
              delete
            </button>
            <Dot color={color.value} />
            {color.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
