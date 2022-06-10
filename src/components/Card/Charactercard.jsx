import { Avatar, Card } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Charactercard.module.scss";
import { Icon } from "@iconify/react";
import confetti from "canvas-confetti";

function Charactercard({
  id,
  name,
  description,
  src,
  reactHandler,
  currentChar,
}) {
  /**
   * Creates a confetti when you react positive
   * @param {number} x
   * @param {number} y
   */
  const handleConfetti = (x, y, colors) => {
    !colors
      ? confetti({
          particleCount: 100,
          spread: 50,
          ticks: 50,
          startVelocity: 10,
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight,
          }
        })
      : confetti({
          particleCount: 100,
          spread: 50,
          ticks: 50,
          startVelocity: 10,
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight,
          },
          colors: ["#363636"],
        });
  };

  return (
    <Card
      className={styles.Card_Link}
      style={!description ? { gap: "1rem" } : null}
    >
      <div className={styles.info}>
        <Avatar src={src} size="xl" />
        <div>
          <h4>{name}</h4>
          {description ? <p>{description}</p> : null}
        </div>
      </div>

      <div className={styles.reactions}>
        <Link to={`/character/${id}`}>See Character</Link>
        <div className={styles.reactions_react}>
          <Icon
            onClick={(e) => {
              handleConfetti(e.clientX, e.clientY);
              reactHandler(true, `${id}`, currentChar);
            }}
            className={styles.clickeableIcon}
            icon="bx:like"
            color="white"
            height="25"
          />
          <Icon
            onClick={(e) => {
              handleConfetti(e.clientX, e.clientY,true);
              reactHandler(false, `${id}`, currentChar);
            }}
            className={styles.clickeableIcon}
            icon="bx:dislike"
            color="white"
            height="25"
          />
        </div>
      </div>
    </Card>
  );
}

export default Charactercard;
