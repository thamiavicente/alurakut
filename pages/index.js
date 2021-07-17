import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';
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
      title: 'ola',
      image: 'https://images.unsplash.com/photo-1520549421221-3e77d246063d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'
    }
  ]);
  const [seguidores, setSeguidores ] = React.useState([]);
  const githubUser = 'thamiavicente';
  const pessoasFavoritas = [
    'vinimyls',
    'sraclick',
    'amandabc',
    'giovanaandrade',
    'marraia',
    'ReGiovannini'
  ];

  React.useEffect(function() {
    fetch(`https://api.github.com/users/${githubUser}/folowers`)
    .then (function (respostaServidor) {
      
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
          {/* <ProfileRelationsBox title="Comunidades" categoria={comunidades} />          */}

          <ProfileRelationsBox title="Amigos" categoria={pessoasFavoritas} />

          <ProfileRelationsBox title="Seguidores" categoria={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  )
}