import React, { useCallback, useEffect, useState } from "react";
import { Grid, Loading, Pagination } from "@nextui-org/react";
import { connect } from "react-redux";
import { getCharactersAction } from "reduxDucks/charactersDuck";
import { AddReactionAction } from "reduxDucks/likesDuck";
import Charactercard from "components/Charactercard/Charactercard.jsx";
import styles from "./Home.module.scss";

/**
 * Homepage
 */
function Home({
  total,
  chars,
  fetching,
  getCharactersAction,
  AddReactionAction,
}) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    getCharactersAction(page);
  }, [getCharactersAction, page]);

  /**
   * Handler which calls the redux function to add a reaction
   */
  const reactHandler = useCallback(
    (reaction, id, currentChar) => {
      AddReactionAction(reaction, id, currentChar);
    },
    [AddReactionAction]
  );

  return (
    <div className={styles.Home}>
      <Grid.Container gap={2} justify="center" className={styles.homeGrid}>
        {chars ? (
          fetching ? (
            <div className={styles.Loading}>
              <Loading />
            </div>
          ) : (
            chars.map((char) => {
              return (
                <Grid sm={4} xs={9} key={char.name}>
                  <Charactercard
                    src={char.thumbnail.path + "." + char.thumbnail.extension}
                    name={char.name}
                    description={char.description}
                    id={char.id}
                    currentChar={char}
                    reactHandler={reactHandler}
                  />
                </Grid>
              );
            })
          )
        ) : null}
      </Grid.Container>
      <Pagination
        className={styles.paginator}
        shadow
        total={Math.round(total / 9)}
        initialPage={1}
        onChange={(page) => setPage(page - 1)}
      />
    </div>
  );
}

/**
 * Get the state like a props in this component
 */
const mapStateToProps = (state) => {
  return {
    chars: state.characters.array,
    fetching: state.characters.fetching,
    total: state.characters.total,
  };
};

export default React.memo(
  connect(mapStateToProps, { getCharactersAction, AddReactionAction })(Home)
);
