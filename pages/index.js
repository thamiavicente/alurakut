import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';

function ProfileSidebar(props){
  return (
    <Box as="aside"> 
      <img src={`https://www.github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  // const [comunidades, setComunidades ] = React.useState([
  const comunidades = ([
    {
      id: '48349837482394873298423',
      title: 'Arco-Íris que Codam',
      image: 'https://images.unsplash.com/photo-1520549421221-3e77d246063d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'
    }
  ]);

  const githubUser = 'thamiavicente';
  const [seguidores, setSeguidores ] = React.useState([]);
  const [seguindo, setSeguindo ] = React.useState([]);
  const [infosPerfil, setInfosPerfil ] = React.useState([]);

  React.useEffect(function() {
    fetch(`https://api.github.com/users/${githubUser}`)
    .then(function (respostaInfosPerfil) {
      return respostaInfosPerfil.json();
    })
    .then(function(respostaCompletaInfosPerfil) {
      setInfosPerfil(respostaCompletaInfosPerfil);
    })

    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(function (respostaSeguidores) {
      return respostaSeguidores.json();
    })
    .then(function(respostaCompletaSeguidores) {
      setSeguidores(respostaCompletaSeguidores);
    })

    fetch(`https://api.github.com/users/${githubUser}/following`)
    .then(function (respostaSeguindo) {
      return respostaSeguindo.json();
    })
    .then(function(respostaCompletaSeguindo) {
      setSeguindo(respostaCompletaSeguindo);
    })
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div style={{gridArea: 'welcomeArea'}}>
          <Box> 
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();

              const dadosForm = new FormData(e.target);
              
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image: dadosForm.get('image'),
              }

              // const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades([...comunidades, comunidade]);
            }}>
              <div>
                <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                arial-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>

              <div>
                <input
                placeholder="Coloque uma URL oara usarmos de capa"
                name="image"
                arial-label="Coloque uma URL oara usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                  Comunidades ({comunidades.length})
              </h2>
              <ul>
                  {comunidades.slice(0,3).map((itemAtual) => {
                      return (
                          <li key={itemAtual.id}>
                              <a href={itemAtual} key={itemAtual}>
                                  <img src={itemAtual.image} />
                                  <span>{itemAtual.title}</span>
                              </a>
                          </li>
                      )
                  })}
              </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                  Seguidores ({infosPerfil.followers})
              </h2>
              <ul>
                  {seguidores.slice(0,6).map((itemAtual) => {
                      return (
                          <li key={itemAtual.login}>
                              <a href={`https://github.com/${itemAtual.login}`} key={itemAtual.login}>
                                  <img src={`https://github.com/${itemAtual.login}.png`} />
                                  <span>{itemAtual.login}</span>
                              </a>
                          </li>
                      )
                  })}
              </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                  Seguindo ({infosPerfil.following})
              </h2>
              <ul>
                  {seguindo.slice(0,6).map((itemAtual) => {
                      return (
                          <li key={itemAtual.login}>
                              <a href={`https://github.com/${itemAtual.login}`} key={itemAtual.login}>
                                  <img src={`https://github.com/${itemAtual.login}.png`} />
                                  <span>{itemAtual.login}</span>
                              </a>
                          </li>
                      )
                  })}
              </ul>
          </ProfileRelationsBoxWrapper>        
        </div>
      </MainGrid>
    </>
  )
}