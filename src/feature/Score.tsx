import { Flex, Heading, Text } from "@chakra-ui/react";
import WinerAnimation from "../assets/lottie/winer.json";
import LoserAnimation from "../assets/lottie/loser.json";
import AverageAnimation from "../assets/lottie/medium.json";
import Lottie from "lottie-react";
import { VscDebugRestart } from "react-icons/vsc";
import CustomButton from "../components/button/CustomButton";

type ScorePropsType = {
  score: number;
  totalQuestion: number;
  onClickReset: () => void;
};

const Score = (p: ScorePropsType) => {
  const renderMessage = () => {
    const rightAnswerPercentage = (p.score / p.totalQuestion) * 100;
    if (rightAnswerPercentage >= 80) {
      return (
        <Flex direction={"column"}>
          <Lottie
            animationData={WinerAnimation}
            style={{ margin: 20, height: 100 }}
          />
          <Text textAlign={"center"}>"Congratulations, You Won!"</Text>
        </Flex>
      );
    } else if (rightAnswerPercentage >= 40) {
      return (
        <Flex direction={"column"}>
          <Lottie
            animationData={AverageAnimation}
            style={{ margin: 20, height: 100 }}
          />
          <Text textAlign={"center"}>"Well Done! You Can Do Better."</Text>
        </Flex>
      );
    } else {
      return (
        <Flex direction={"column"}>
          <Lottie
            style={{ margin: 20, height: 100 }}
            animationData={LoserAnimation}
          />
          <Text textAlign={"center"}>"Game Over, You Lost!"</Text>
        </Flex>
      );
    }
  };

  return (
    <>
      <Flex direction="column" alignItems={"center"}>
        <Heading as="h1" fontSize="2xl" mb={5}>
          {renderMessage()}
        </Heading>
        <Heading fontSize={"3xl"}>Your Score</Heading>
        <Heading fontSize={"xl"} mt={5}>
          {p.score}/{p.totalQuestion}
        </Heading>
        <Flex mt={4}>
          <CustomButton
            onClick={p.onClickReset}
            text="Reset Game"
            icon={<VscDebugRestart />}
          />{" "}
        </Flex>
      </Flex>
    </>
  );
};

export default Score;
