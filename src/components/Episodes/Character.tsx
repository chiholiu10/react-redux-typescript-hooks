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
  Button
} from './Character.styles';
import { Loading } from '../Loading/Loading';
import history from "../../history";
import LazyLoad from 'react-lazyload';
import axios from "axios";

export const Character: FC<CharacterPageProps> = ({ characterDetails }) => {
  let { id } = useParams<{ id: string; }>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        dispatch(getEpisode(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const previousPage = () => {
    history.goBack();
  };

  return (
    <Suspense fallback={<Loading />}>
      <CharacterContainer>
        <CharacterColumn>
          <CharacterName>{characterDetails.name}</CharacterName>
          <CharacterStatus>Status: {characterDetails.status}</CharacterStatus>
          <CharacterSpecies>Species: {characterDetails.species}</CharacterSpecies>
          <CharacterGender>Gender: {characterDetails.gender}</CharacterGender>
        </CharacterColumn>
        <CharacterColumn>
          <LazyLoad>
            <CharacterImage src={characterDetails.image} alt={characterDetails.name} />
          </LazyLoad>
        </CharacterColumn>
      </CharacterContainer>
      <CharacterTopColumn>
        <Button onClick={() => previousPage()}>Go Back</Button>
      </CharacterTopColumn>
    </Suspense>
  );
};

const mapStateToProps = (state: any) => {
  return {
    characterDetails: state.episodes.episodeData || []
  };
};

const connector = connect(mapStateToProps);
type CharacterPageProps = ConnectedProps<typeof connector>;
export default connector(memo(Character));