import RankingCard from "components/RankingCard/RankingCard";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { restoreReactionsAction } from "reduxDucks/likesDuck";
import styles from "./Ranking.module.scss";

function Ranking({ ranking, restoreReactionsAction }) {
  useEffect(() => {
    restoreReactionsAction();
  }, [restoreReactionsAction]);

  return (
    <div className={styles.Ranking}>
      {ranking.length > 0 ? (
        ranking.map((rank, index) => {
          return (
            <RankingCard
              key={index}
              name={rank.name}
              likes={rank.likes}
              source={rank.thumbnail}
              position={index}
            />
          );
        })
      ) : (
        <h1>No Ranking to show</h1>
      )}
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

export default connect(mapStateToProps, {
  restoreReactionsAction,
})(Ranking);
