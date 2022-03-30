import React from 'react'
import { CrudApi } from './componentes/CrudApi'
import { CrudApp } from './componentes/CrudApp'

const App = () => {
  return (
    <>
      <h1>Ejercicios con React</h1>
      <hr/>
      <CrudApi/>
      <hr/>
      <CrudApp/>
    </>
  )
}

export default App