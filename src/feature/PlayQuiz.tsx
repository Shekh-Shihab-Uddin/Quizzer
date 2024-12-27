import { useEffect, useState } from "react";
import Quiz from "../components/quiz/Quiz";
import { QuizItem } from "../interfaces/quizType";
import { Box, HStack } from "@chakra-ui/react";

const PlayQuiz = (p: {
  quiz: QuizItem[];
  onFinished: (score: number) => void;
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<("correct" | "incorrect")[]>(
    []
  );

  console.log(answerStatus);

  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (isGameOver) {
      p.onFinished(score);
    }
  }, [isGameOver, score, p]);

  const renderProgressBar = () => {
    return (
      <HStack justifyContent={"center"} wrap={"wrap"}>
        {p.quiz.map((_, i) => {
          return (
            <Box
              key={i}
              h={3}
              backgroundColor={
                i >= currentQuestionIndex
                  ? "gray.200"
                  : answerStatus[i] === "correct"
                  ? "green.300"
                  : "red.300"
              }
              w={50}
            />
          );
        })}
      </HStack>
    );
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswerStatus([]);
    setScore(0);
  };

  const handleNextQuestion = (answer: string) => {
    if (answer === p.quiz[currentQuestionIndex].correct_answer) {
      setAnswerStatus((prev) => [...prev, "correct"]);
      setScore(score + 1);
    } else {
      setAnswerStatus((prev) => [...prev, "incorrect"]);
    }
    if (currentQuestionIndex >= p.quiz.length - 1) {
      setIsGameOver(true);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <>
      <Box>
        {!isGameOver && (
          <>
            {renderProgressBar()}
            <Quiz
              question={p.quiz[currentQuestionIndex].question}
              incorrect_answers={p.quiz[currentQuestionIndex].incorrect_answers}
              correct_answer={p.quiz[currentQuestionIndex].correct_answer}
              onClickNext={handleNextQuestion}
              onClickReset={handleRestartQuiz}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default PlayQuiz;
