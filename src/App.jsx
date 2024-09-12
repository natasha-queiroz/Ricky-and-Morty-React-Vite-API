import React, { useState, useEffect } from 'react'

function App() {

  const [pagina, setPagina] = useState(1)
  const [campo, setcampo] = useState("")
  const [image, setimage] = useState("")
  const [nome, setnome] = useState("")
  const [status, setstatus] = useState("")
  const [species, setspecies] = useState("")
  const [gender, setgender] = useState("")
  const [origin, setorigin] = useState("")
  const [location, setlocation] = useState("")
  const [created, setcreated] = useState("")
  const [episode, setepisode] = useState("")

  useEffect(() => {
    informacao(pagina)
  }, [pagina])

  
  const fetchApi = async (value) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${value}`)
    const data = await response.json()
    return data
  }
   
  const informacao = async (id) => {
    const result = await fetchApi(id)
 
    setimage(result.image)
    setnome(result.name)
    setstatus(result.status)
    setspecies(result.species)
    setgender(result.gender)
    setorigin(result.origin.name)
    setlocation(result.location.name)
    setcreated(result.created)

    const numeroepisodios = result.episode.map(Url => Url.split('/').pop())
    const episode = numeroepisodios.join(', ')
    setepisode(episode)
  }

  
  const verificar = async () => {
    const campo = campo2.value
    debugger
    if (campo >= 1 && campo <= 826) {
      await informacao(campo)
    } else {
      alert('[ ERRO ]...Este personagem nao existe!')
    }
  }

  const paginaanterior = async () => {
    if (pagina > 1) {
      setPagina(Pagina_anterio => Pagina_anterio - 1)
    }
  }

  const paginaproxima = async () => {
    setPagina(proxima_Pagina => proxima_Pagina + 1)
  }

  return (
    <>
      <main>
        <h2 className="rick1">Rick and Morty</h2>
        <form action="" method="get">
          <input className="input1" type="text" placeholder="ID do personagem" disabled />
          <input className="input2" type="number" id='campo2' />
          <input className="input3" type="button" value="Buscar" onClick={verificar} />
        </form>

        <div className="containerbotao">
          <input className="botao" type="button" value="Anterior" onClick={paginaanterior} />
          <div className="fundoimg">
            <img src={image} alt="character" />
          </div>
          <input className="botao" type="button" value="Proximo" onClick={paginaproxima} />
        </div>

        <div className="containerinfo">
          <article> <h1>Nome:</h1>       <h2>{nome}</h2>    </article>
          <article> <h1>Status:</h1>     <h2> {status}</h2>  </article>
          <article> <h1>Espécies:</h1>   <h2> {species}</h2> </article>
          <article> <h1>Gênero:</h1>     <h2> {gender}</h2>  </article>
          <article> <h1>Origem:</h1>     <h2> {origin}</h2>  </article>
          <article> <h1>Localidade:</h1> <h2> {location}</h2>     </article>
          <article> <h1>Criada:</h1>     <h2> {created}</h2> </article>
        </div>
        <article className="episodio">
          <h1 className="tituloepi">Episodios:</h1>
          <h2> {episode}</h2>
        </article>
      </main>
    </>
  )
}
export default App
