import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
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
  const [comunidades, setComunidades ] = React.useState([]);

  const githubUser = 'thamiavicente';
  const pessoasFavoritas = [
    'vinimyls',
    'sraclick',
    'amandabc',
    'giovanaandrade',
    'marraia',
    'ReGiovannini'
  ];

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
              Amigos ({pessoasFavoritas.length})
            </h2>
            <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
            </ul>
            </ProfileRelationsBoxWrapper>

            <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                  <a href={`/community/${itemAtual.title}`} key={itemAtual.title}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
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
