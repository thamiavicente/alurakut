import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export default function ProfileRelationsBox(props) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {props.title} ({props.categoria.length})
            </h2>
            <ul>
                {props.categoria.map((itemAtual) => {
                    return (
                        <li key={itemAtual}>
                            <a href={`https://github.com/${itemAtual}`} key={itemAtual}>
                                <img src={`https://github.com/${itemAtual}.png`} />
                                <span>{itemAtual}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </ProfileRelationsBoxWrapper>   
)};