import { Icon } from "@iconify/react";
import { Button, Grid } from "@nextui-org/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss"

function Navbar() {
  
  const location = useLocation();
  let navigate = useNavigate();

  return (
    <Grid.Container className={styles.navbar} justify="center" alignItems="center">
      <Grid sm={2} justify="center">
        {location.pathname !== "/" ? (
          <Icon
            icon="bi:arrow-left"
            color="white"
            height="32"
            onClick={() => navigate("/")}
          />
        ) : null}
      </Grid>
      <Grid sm={8} xs={6} justify="center">
        <h2>Super heroes</h2>
      </Grid>
      <Grid sm={2} xs={6} justify="center">
        {location.pathname === "/" ? (
          <Button
            auto
            css={{ backgroundColor: "#222635" }}
            rounded
            onClick={() => navigate("/ranking")}
            icon={
              <Icon icon="fa6-solid:ranking-star" color="#ffd600" height="24" />
            }
          >
            RANKING
          </Button>
        ) : null}
      </Grid>
    </Grid.Container>
  );
}

export default Navbar;
