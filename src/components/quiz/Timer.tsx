import { useEffect, useState } from "react";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "../../components/ui/progress-circle";

type TimerProps = {
  max: number;
  onFinish: () => void;
};

let timer: ReturnType<typeof setTimeout>;

const Timer = (p: TimerProps) => {
  const [progress, setProgress] = useState<number>(p.max);

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(timer);
      p.onFinish();
    }
  }, [progress]);

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <ProgressCircleRoot
        colorPalette={"yellow"}
        max={p.max}
        value={progress}
        size={"lg"}
      >
        <ProgressCircleValueText>{progress}</ProgressCircleValueText>
        <ProgressCircleRing />
      </ProgressCircleRoot>
    </>
  );
};

export default Timer;
