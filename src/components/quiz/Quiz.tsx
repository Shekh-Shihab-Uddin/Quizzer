import { Flex, Heading, SimpleGrid, Text, Box } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

import { Radio, RadioGroup } from "../ui/radio";
import { useEffect, useState } from "react";
import CustomButton from "../button/CustomButton";

import CorrectAnimation from "../../assets/lottie/valid.json";
import IncorrectAnimation from "../../assets/lottie/invalid.json";

import Lottie from "lottie-react";
import Timer from "./Timer";

type QuizPropsType = {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  onClickNext: (answer: string) => void;
  onClickReset: () => void;
  children?: React.ReactNode;
};

enum AnswerType {
  correct = "correct",
  incorrect = "incorrect",
  unanswered = "unanswered",
}

const Quiz = (p: QuizPropsType) => {
  const [answer, setAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [answerStatus, setAnswerStatus] = useState<AnswerType>(
    AnswerType.unanswered
  );
  const [resetKey, setResetKey] = useState<number>(0); // State for resetting the Timer

  useEffect(() => {
    const orderedOptions = [p.correct_answer, ...p.incorrect_answers];
    for (let i = orderedOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [orderedOptions[i], orderedOptions[j]] = [
        orderedOptions[j],
        orderedOptions[i],
      ];
    }
    setOptions(orderedOptions);
  }, [p.question, p.correct_answer, p.incorrect_answers]);

  useEffect(() => {
    if (answer) {
      if (isValidAnswer(answer)) {
        setAnswerStatus(AnswerType.correct);
      } else {
        setAnswerStatus(AnswerType.incorrect);
      }
    }
  }, [answer]);

  const isValidAnswer = (answer: string): boolean => {
    return answer === p.correct_answer;
  };

  const radioList = options.map((option) => {
    return (
      <Radio key={option} value={option} fontWeight={"semibold"}>
        <Text
          color={
            answerStatus === AnswerType.unanswered
              ? "black"
              : isValidAnswer(option)
              ? "green"
              : "red"
          }
          dangerouslySetInnerHTML={{ __html: option }}
        ></Text>
      </Radio>
    );
  });

  const handleNext = () => {
    setResetKey((prevKey) => prevKey + 1);
    p.onClickNext(answer);
  };

  const handleReset = () => {
    setResetKey((prevKey) => prevKey + 1);
    p.onClickReset();
  };

  return (
    <>
      <Flex
        direction={"column"}
        alignItems={"center"}
        maxW={"50%"}
        margin={"auto"}
      >
        <Box h={300}>
          <Heading
            textAlign={"center"}
            fontSize="3xl"
            mt={5}
            mb={10}
            color={"black"}
            dangerouslySetInnerHTML={{ __html: p.question }}
          />
          <RadioGroup
            display={"flex"}
            justifyContent={"center"}
            disabled={answerStatus !== AnswerType.unanswered}
            value={answerStatus === AnswerType.unanswered ? "" : answer}
            onValueChange={({ value }) => setAnswer(value as string)}
            colorPalette={"yellow"}
          >
            <SimpleGrid columns={2} gap={8} spaceX={"auto"}>
              {radioList}
            </SimpleGrid>
          </RadioGroup>
        </Box>

        {/* Render the Timer with a dynamic key */}
        {answerStatus === AnswerType.unanswered ? (
          <Box mt={10} position={"relative"}>
            <Timer
              key={resetKey}
              max={10}
              onFinish={() => {
                handleNext();
              }}
            />
          </Box>
        ) : (
          <Lottie
            loop={false}
            style={{ marginTop: 40, height: 60, position: "relative" }}
            animationData={
              answerStatus === AnswerType.correct
                ? CorrectAnimation
                : IncorrectAnimation
            }
            onComplete={() => {
              setAnswerStatus(AnswerType.unanswered);
              handleNext();
            }}
          />
        )}
      </Flex>

      <Box
        position={"absolute"}
        top={{ sm: "80%", lg: "70%" }}
        right={{ base: "20%", lg: "10%" }}
      >
        <CustomButton
          onClick={handleNext}
          icon={<IoIosArrowForward />}
          text="Next Question"
        />
      </Box>
      <Box
        position={"absolute"}
        top={{ sm: "80%", lg: "70%" }}
        left={{ base: "15%", lg: "10%" }}
      >
        <CustomButton
          onClick={handleReset}
          icon={<VscDebugRestart />}
          text="Restart Game"
        />
      </Box>
    </>
  );
};

export default Quiz;
