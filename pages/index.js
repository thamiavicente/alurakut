import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

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

export default function Home(props) {
  const githubUser = props.githubUser;

  const [comunidadesTitle, setComunidadesTitle] = React.useState([]);
  const [comunidadesImage, setComunidadesImage] = React.useState([]);

  const [comunidades, setComunidades ] = React.useState([]);
  const [seguidores, setSeguidores ] = React.useState([]);
  const [seguindo, setSeguindo ] = React.useState([]);
  const [infosPerfil, setInfosPerfil ] = React.useState([]);

  React.useEffect(function() {
    // API Github
    fetch(`https://api.github.com/users/${githubUser}`)
    .then((respostaInfosPerfil) => respostaInfosPerfil.json())
    .then((respostaCompletaInfosPerfil) => {setInfosPerfil(respostaCompletaInfosPerfil)});

    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then((respostaSeguidores) => respostaSeguidores.json())
    .then((respostaCompletaSeguidores) => {setSeguidores(respostaCompletaSeguidores)});

    fetch(`https://api.github.com/users/${githubUser}/following`)
    .then((respostaSeguindo) => respostaSeguindo.json())
    .then((respostaCompletaSeguindo) => {setSeguindo(respostaCompletaSeguindo)});

    //API Dato - GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'ff9efd86abbf16a3a85696ca399cc3',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
        }
      }` })
    })
    .then((respostaComunidades) => respostaComunidades.json())
    .then((respostaCompletaComunidades) => {
      const comunidadesCriadasDato = respostaCompletaComunidades.data.allCommunities;
      setComunidades(comunidadesCriadasDato);
    });

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
                title: dadosForm.get('title'),
                imageUrl: dadosForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                const comunidade = dados.registroCriado;
                setComunidades([comunidade, ...comunidades]);
                setComunidadesTitle('');
                setComunidadesImage('');
              })
            }}>
              
              <div>
                <input
                value={comunidadesTitle}
                onChange={(e) => setComunidadesTitle(e.target.value)}
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                arial-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>

              <div>
                <input
                value={comunidadesImage}
                onChange={(e) => setComunidadesImage(e.target.value)}
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
                              <a href={`/communities/${itemAtual.id}`} key={itemAtual}>
                                  <img src={itemAtual.imageUrl} />
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut-eight-jet.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then ((respostaServer) => respostaServer.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    },
  }
}