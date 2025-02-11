import React from 'react'
import { useParams } from 'react-router'

function Pokemon() {
  const params = useParams()

  return (
    <div>
      <h1>Pokemon {params.name}</h1>
    </div>
  )
}

export default Pokemon