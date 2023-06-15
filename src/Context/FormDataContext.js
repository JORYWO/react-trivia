import { createContext, useContext, useState } from 'react';

const DataContext = createContext();
const initialSettings = {
  difficulty: '',
  category: '',
  time: '',
};

export function useFormData(){
  return useContext(DataContext)
}

export function FormDataContext({ children }){
  const [formData, setFormData] = useState(initialSettings);
  
  const handleChange = (event) => {
    const {name, value} = event.target
    setFormData(prevFormData => {
      return {
      ...prevFormData,
      [name]: value
      }
    })
  }

  return(
    <DataContext.Provider value={{ formData, handleChange }}>
      {children}
    </DataContext.Provider>
  )
}