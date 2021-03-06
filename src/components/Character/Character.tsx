import { FC, useEffect, Suspense, memo } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEpisode } from "../../actions/index";
import {
  CharacterContainer,
  CharacterColumn,
  CharacterName,
  CharacterStatus,
  CharacterSpecies,
  CharacterGender,
  CharacterImage,
  CharacterTopColumn,
  CharacterInnerContainer,
  Button
} from './Character.styles';
import { Loading } from '../Loading/Loading';
import history from "../../history";
import { StateProps } from "../../types/types";

export const Character: FC<CharacterPageProps> = ({ characterDetails }) => {
  let { id } = useParams<{ id: string; }>();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        history.push({
          pathname: '/404'
        });
        throw response;
      })
      .then(response => {
        dispatch(getEpisode(response.data));
      });
  }, []);

  const previousPage = () => history.back();

  return (
    <Suspense fallback={<Loading />}>
      <CharacterContainer>
        <CharacterTopColumn>
          <Button onClick={() => previousPage()}>Go Back</Button>
        </CharacterTopColumn>
        <CharacterInnerContainer>
          <CharacterColumn>
            <CharacterName>{characterDetails.name}</CharacterName>
            <CharacterStatus>Status: {characterDetails.status}</CharacterStatus>
            <CharacterSpecies>Species: {characterDetails.species}</CharacterSpecies>
            <CharacterGender>Gender: {characterDetails.gender}</CharacterGender>
          </CharacterColumn>
          <CharacterColumn>
            <CharacterImage src={characterDetails.image} loading="lazy" alt={characterDetails.name} />
          </CharacterColumn>
        </CharacterInnerContainer>
      </CharacterContainer>
    </Suspense>
  );
};

const mapStateToProps = (state: { episodes: StateProps; }) => ({
  characterDetails: state.episodes.episodeData || []
});

const connector = connect(mapStateToProps);
type CharacterPageProps = ConnectedProps<typeof connector>;
export default connector(memo(Character));