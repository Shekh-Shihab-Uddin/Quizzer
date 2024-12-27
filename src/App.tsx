import { useState, useEffect } from "react";
import Header from "./feature/Header";
import SetQuestionQuantity from "./feature/SetQuestionQuantity";
import { Box, Flex, Image } from "@chakra-ui/react";
import bgImage from "./assets/background.jpg";
import { QuizAPI } from "./api/quiz-api";
import { Spinner, Text, VStack } from "@chakra-ui/react";

import {
  FetchQuizeParams,
  QuizCategory,
  QuizDifficulties,
  QuizItem,
  QuizType,
} from "./interfaces/quizType";

import SetQuestionCatagory from "./feature/SetQuestionCatagory";
import SetDifficulty from "./feature/SetDifficulty";
import PlayQuiz from "./feature/PlayQuiz";
import Score from "./feature/Score";

enum Step {
  Loading,
  SetQuestionQuantity,
  SetQuestionCatagory,
  SetDifficulty,
  Play,
  Score,
}

function App() {
  const [step, setStep] = useState<Step>(Step.Loading);
  const [score, setScore] = useState<number>(0);
  const [quizParams, setQuizParams] = useState<FetchQuizeParams>({
    amount: 5,
    category: "",
    difficulty: QuizDifficulties.mixed,
    type: QuizType.multiple,
  });

  const [categories, setCategories] = useState<QuizCategory[]>([]);
  useEffect(() => {
    async function fetchCategory() {
      setCategories([
        { id: -1, name: "Mixed" },
        ...(await QuizAPI.fetchCategories()),
      ]);
      setStep(Step.SetQuestionQuantity);
    }
    fetchCategory();
  }, []);

  const [fetchedQuiz, setFetchedQuiz] = useState<QuizItem[]>([]);

  // this is called seperately and the argument taken from where it is called not from the usestate
  // Because where the function is called the state updated just before that
  // the we should wait for at least one render or had to bypass in this way
  async function fetchQuestions(params: FetchQuizeParams) {
    const quiz = await QuizAPI.fetchQuiz(params);
    if (quiz.length > 0) {
      setFetchedQuiz(quiz);
      setStep(Step.Play);
    } else {
      alert(
        "There is not this much questions in this category, restarting gam"
      );
      setStep(Step.SetQuestionQuantity);
    }
  }

  const renderFeaturesByStep = () => {
    switch (step) {
      case Step.Loading:
        return (
          <Flex justifyContent={"center"} h={"80vh"} alignItems={"center"}>
            <VStack colorPalette="teal">
              <Spinner color="yellow.600" size="xl" />
              <Text color="yellow.600" fontSize={"xl"}>
                Loading...
              </Text>
            </VStack>
          </Flex>
        );
      case Step.SetQuestionQuantity:
        return (
          <SetQuestionQuantity
            min={5}
            max={30}
            step={5}
            defaultValue={5}
            onClickNext={(amount: number) => {
              if (quizParams) {
                setQuizParams({ ...quizParams, amount });
                setStep(Step.SetQuestionCatagory);
              }
            }}
          />
        );
      case Step.SetQuestionCatagory:
        return (
          <SetQuestionCatagory
            categories={categories}
            onClickNext={(selectedCategoryId: string) => {
              if (quizParams) {
                setQuizParams({
                  ...quizParams,
                  category:
                    selectedCategoryId === "-1" ? "" : selectedCategoryId,
                });
                setStep(Step.SetDifficulty);
              }
            }}
          />
        );
      case Step.SetDifficulty:
        return (
          <SetDifficulty
            onClickNext={(currentDifficulty: QuizDifficulties) => {
              if (quizParams) {
                const params = { ...quizParams, difficulty: currentDifficulty };
                setQuizParams(params);

                //frtching function defined above
                fetchQuestions(params);
                // setStep(Step.Play);
              }
            }}
          />
        );
      case Step.Play:
        return (
          <PlayQuiz
            quiz={fetchedQuiz}
            onFinished={(score: number) => {
              setScore(score);
              setStep(Step.Score);
            }}
          />
        );
      case Step.Score:
        return (
          <Score
            score={score}
            totalQuestion={quizParams.amount}
            onClickReset={() => {
              setScore(0);
              setStep(Step.SetQuestionQuantity);
              setFetchedQuiz([]);
              setQuizParams({
                amount: 5,
                category: "",
                difficulty: QuizDifficulties.mixed,
                type: QuizType.multiple,
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Box>
        <Box>
          <Image
            src={bgImage}
            alt="Background"
            position="absolute"
            top={250}
            right={0}
            opacity={0.2}
            transform="skewY(20deg)"
            zIndex={0}
            overflow={"clip"}
            maxH={"40%"}
          />
        </Box>
        <Box zIndex={1}>
          <Box>{renderFeaturesByStep()}</Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
