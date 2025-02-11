import { useRef } from "react";
import { useNavigate } from "react-router";
import { useName } from "../../hooks/useName";

function Home() {
  const inputRef = useRef()
  const { setName, name } = useName()
  const navigate = useNavigate()

  const handleSetName = () => {
    if (!inputRef.current.value) return
    setName(inputRef.current.value)
    navigate("/pokedex")
  }
  
  return (
    <div>
      <h1>POKÉDEX</h1>
      <h2>¡Hola entrenador!</h2>
      <p>Para poder comenzar, dame tu nombre</p>
      <input type='text' ref={inputRef}/>
      <button onClick={handleSetName}>Comenzar</button>
    </div>
  )
}

export default Home