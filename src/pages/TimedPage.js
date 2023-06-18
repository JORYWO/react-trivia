import { useState, useEffect } from "react"
import axios from "axios"
import { useFormData } from '../Context/FormDataContext';
import { useGameModeData } from '../Context/GameModeContext';

import Question from "../components/Question"
import Spinner from "../components/Spinner"

export default function TimedPage(){
  const {formData} = useFormData();
  const { changeGameMode } = useGameModeData()

  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(formData.time)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    let formattedTime = ""
    if (minutes > 0) {
      formattedTime += `${minutes} minute${minutes === 1 ? '' : 's'}`;
    }
    if (seconds > 0) {
      formattedTime += `${minutes > 0 ? ' and ' : ''}${seconds} second${seconds === 1 ? '' : 's'}`;
    }
    return formattedTime;
  };
  
  
  if (isLoading) {
    return (<Spinner/>)
  }

  return (
    <div>
      {timer > 0 ? (
        <p>{formatTime()}</p>
      ) : (
        <p>Countdown done</p>
      )}
    </div>
  );
}
