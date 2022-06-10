import { Icon } from "@iconify/react";
import { Grid, Loading } from "@nextui-org/react";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleCharacterAction } from "reduxDucks/charactersDuck";
import { AddReactionAction } from "reduxDucks/likesDuck";
import styles from "./Character.module.scss";

/**
 * Character page
 */
function Character({
  fetching,
  char,
  getSingleCharacterAction,
  AddReactionAction,
}) {
  const { id } = useParams();

  useEffect(() => {
    getSingleCharacterAction(id);
  }, [getSingleCharacterAction, id]);

  /**
   * Handler which calls the redux function to add a reaction
   */
  const reactHandler = useCallback(
    (reaction, id) => {
      AddReactionAction(reaction, id,char);
    },
    [AddReactionAction, char]
  );

  /**
   * If fetching show a loading
   */
  if (fetching) {
    return <Loading />;
  }

  return (
    <div className={styles.CharacterPage}>
      <Grid.Container
        gap={2}
        justify="center"
        className={styles.CharacterContainer}
      >
        <Grid xs={6} sm={4} className={styles.gridImg}>
          {char.thumbnail ? (
            <img
              src={char.thumbnail.path + "." + char.thumbnail.extension}
              alt=""
            />
          ) : null}
        </Grid>
        <Grid xs={8} sm={5}>
          <div>
            <h1>{char.name}</h1>
            <p>{char.description}</p>
            <div className={styles.reactions_react}>
              <Icon
                onClick={() => reactHandler(true, id)}
                className={styles.clickeableIcon}
                icon="bx:like"
                color="white"
                height="25"
              />
              <Icon
                onClick={() => reactHandler(false, id)}
                className={styles.clickeableIcon}
                icon="bx:dislike"
                color="white"
                height="25"
              />
            </div>
          </div>
        </Grid>
      </Grid.Container>
    </div>
  );
}

/**
 * Get the state like a props in this component
 */
const mapStateToProps = (state) => {
  return {
    char: state.characters.current,
    fetching: state.characters.fetching,
  };
};

export default connect(mapStateToProps, {
  getSingleCharacterAction,
  AddReactionAction,
})(Character);
