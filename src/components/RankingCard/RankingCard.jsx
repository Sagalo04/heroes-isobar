import { Icon } from "@iconify/react";
import { Avatar, Grid } from "@nextui-org/react";
import React from "react";
import styles from "./RankingCard.module.scss";

function RankingCard({ name, likes, position, source }) {
  return (
    <Grid.Container gap={2} className={styles.Card}>
      <Grid sm={4} xs={0} className={styles.flexin}>
        <Avatar src={source} size="xl" />
        <h3>{name}</h3>
      </Grid>
      <Grid sm={0} xs={6} className={styles.flexin2} justify="center">
          <Avatar src={source} size="xl" />
          <h3>{name}</h3>
        <div className={styles.flexin}>
          <h4>{likes}</h4>
          <Icon icon="bxs:like" color="#ffd600" height="24" />
        </div>
      </Grid>
      <Grid sm={4} xs={0} className={styles.flexin} justify="center">
        <h4>{likes}</h4>
        <Icon icon="bxs:like" color="#ffd600" height="24" />
      </Grid>
      <Grid sm={4} xs={6} justify="center" alignItems="center">
        <h3>Rank: {position + 1}</h3>
      </Grid>
    </Grid.Container>
  );
}


export default RankingCard;
