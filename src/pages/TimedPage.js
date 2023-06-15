import { useFormData } from '../Context/FormDataContext';
import { useGameModeData } from '../Context/GameModeContext';

export default function TimedPage(){

  const {formData} = useFormData();
  const { changeGameMode } = useGameModeData()

  return (
    <div>TimedPage: {formData.time}</div>
  )
}
