import { useEffect, useState } from "react"

export default function FunctionalComponent() {
  const [title, setTitle] = useState("salom")
  const [object, setObject] = useState({ id: 1, name: "Ali" })
  const [array, setArray] = useState([1, 2, 3, 4, 5])

  const changeTitle = () => {
    setTitle("Alik")
  }

  const changeObj = () => {
    setObject((prev) => {
      console.log(prev);
      return { ...prev, name: "Jack", value1: "alik" }
    })
  }

  useEffect(() => {
    console.log("salom");
  }, [])

  const addToLocal = () => {
    console.log("123");
    localStorage.setItem("store", JSON.stringify(array))
  }
  const getLocalStorage = () => {
    console.log(JSON.parse(localStorage.getItem("store")));
  }
  const deleteStorage=()=>{
    localStorage.removeItem("store")
  }

  return (
    <div className="container">
      <h1>{title}</h1>
      <h2>Funcional Component</h2>
      <h4>Id: {object.id}</h4>
      <h4>Name: {object.name}</h4>
      <button onClick={() => changeTitle()} className="btn btn-danger">Change title</button>
      <button onClick={() => changeObj()} className="btn btn-primary">Change Object</button>
      <br />
      <button onClick={addToLocal} className="btn btn-primary mt-2">Add to local Storage</button>
      <button onClick={getLocalStorage} className="btn btn-success mt-2">Get from local Storage</button>
      <button onClick={deleteStorage} className="btn btn-success mt-2">Delete from local Storage</button>
    </div>
  )
}
