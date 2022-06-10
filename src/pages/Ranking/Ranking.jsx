import RankingCard from "components/RankingCard/RankingCard";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRankingAction } from "reduxDucks/likesDuck";
import styles from "./Ranking.module.scss";

function Ranking({ ranking, getRankingAction }) {

  useEffect(() => {
    getRankingAction();
  }, [getRankingAction]);

  return (
    <div className={styles.Ranking}>
      {ranking.length
        ? ranking.map((rank, index) => {
            return (
              <RankingCard
                name={rank.character.name}
                likes={rank.likes}
                source={
                  rank.character.thumbnail.path +
                  "." +
                  rank.character.thumbnail.extension
                }
                position={index}
              />
            );
          })
        : <h1>No Ranking to show</h1>}
    </div>
  );
}

/**
 * Get the state like a props in this component
 */
const mapStateToProps = (state) => {
  return {
    ranking: state.reactions.ranking,
  };
};

export default connect(mapStateToProps, { getRankingAction })(Ranking);
