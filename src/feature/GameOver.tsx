import { Heading } from "@chakra-ui/react";

type GameOverPorps = {
  onClickReset: () => void;
  score: number;
};

const GameOver = (p: GameOverPorps) => {
  return (
    <>
      <Heading>Game Over</Heading>
      <Heading>{p.score}</Heading>
    </>
  );
};

export default GameOver;
