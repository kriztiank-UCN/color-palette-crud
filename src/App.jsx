// How to set up React with Firebase/Firestore v9 (Part 3 | setDoc)
// https://youtu.be/TNTMTJrxIY0

import { onSnapshot, collection, addDoc, setDoc, doc } from "firebase/firestore"
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
  console.log(colors)

  useEffect(
    () =>
      // db: handle to Database, colors: collection name
      onSnapshot(
        collection(db, "colors"),
        // callback function with snapshot from the database
        // Return the data and the id, manually with a custom property, from the database
        snapshot => setColors(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      ),
    []
  )

  const handleNew = async () => {
    const name = prompt("Enter color name")
    const value = prompt("Enter color value")

    const collectionRef = collection(db, "colors")
    const payload = { name, value }
    // await addDoc(collectionRef, payload)
    const docRef = await addDoc(collectionRef, payload)
    console.log("The new ID is: " + docRef.id)
  }

  const handleEdit = async id => {
    const name = prompt("Enter color name")
    const value = prompt("Enter color value")

    const docRef = doc(db, "colors", id)
    const payload = { name, value }

    setDoc(docRef, payload)
    console.log(id)
  }

  return (
    <div className="root">
      <button className="button" onClick={handleNew}>
        New
      </button>
      <ul>
        {colors.map(color => (
          <li key={color.id}>
            <a href="#" onClick={() => handleEdit(color.id)}>
              edit
            </a>
            <Dot color={color.value} />
            {color.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
