import { Flex, Heading, Box } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Radio, RadioGroup } from "../components/ui/radio";
import { useState } from "react";
import { QuizDifficulties } from "../interfaces/quizType";
import CustomButton from "../components/button/CustomButton";

const SetDifficulty = (p: {
  onClickNext: (currentDifficulty: QuizDifficulties) => void;
}) => {
  const [currentDifficulty, setCurrentDifficulty] = useState<QuizDifficulties>(
    QuizDifficulties.mixed
  );

  const radioList = Object.values(QuizDifficulties).map(
    (difficulty: QuizDifficulties) => {
      return (
        <Radio key={difficulty} value={difficulty} fontWeight={"semibold"}>
          {difficulty === QuizDifficulties.mixed
            ? "MIXED"
            : difficulty.toUpperCase()}
        </Radio>
      );
    }
  );
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize="3xl" mb={5} color={"black"}>
          Select Difficulty Level
        </Heading>

        <RadioGroup
          display={"flex"}
          justifyContent={"center"}
          value={currentDifficulty}
          onValueChange={({ value }) =>
            setCurrentDifficulty(value as QuizDifficulties)
          }
          colorPalette={"yellow"}
        >
          <Flex direction={"column"} gap="4">
            {radioList}
          </Flex>
        </RadioGroup>
      </Flex>
      <Box position={"absolute"} top={{ sm: "92%", lg: "80%" }} right="10%">
        <CustomButton
          onClick={() => {
            p.onClickNext(currentDifficulty);
          }}
          text="Play Now"
          icon={<IoIosArrowForward />}
        />
      </Box>
    </>
  );
};

export default SetDifficulty;
