import React,{useState,useEffect} from 'react';
import {FcNext,FcPrevious,FcOk,FcDeleteDatabase} from 'react-icons/fc'
const Calendar = () => {
  // On utilise l'état local pour stocker la date actuellement affichée dans le calendrier
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
  const [selectedDate,setSelectedDate] = useState(null)
  const [textareaValue, setTextareaValue] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [markedDates, setMarkedDates] = useState([])

  // Fonction pour changer le mois affiché dans le calendrier
  const changeMonth = (amount) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  // Fonction pour obtenir les noms des jours de la semaine
  const getDayNames = () => {
    const dayNames = ['Samedi','Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    return dayNames.map((name) => <div key={name}>{name}</div>);
  };

  // Fonction pour obtenir les jours du mois actuel
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const today = todayDate.getDate(); // Jour du mois actuel (ex: 1, 2, ..., 31)
    const currentMonth = todayDate.getMonth()
    const days = [];

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      const isCurrentMonth = date >= firstDayOfMonth && date <= lastDayOfMonth;
      const isToday = isCurrentMonth && i === today && month === currentMonth;
      const isMarked = markedDates.some((markedDate) => markedDate.toDateString() === date.toDateString());

      let classNames
      isToday ? classNames='current-day inactive-day': classNames='inactive-day' && isMarked ? classNames='marked-day inactive-day' : classNames='inactive-day'
      days.push(
        <div key={i} className={classNames} onClick={() => handleDateClick(date)}>
          {i}
        </div>
      );
    }
  
    return days;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayDate(new Date());
    }, 1000); // Met à jour la date du jour toutes les secondes
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const savedTaskList = localStorage.getItem('taskList');
    if (savedTaskList) {
      setTaskList(JSON.parse(savedTaskList));
    }
  }, []);

  useEffect(() => {
    const savedMarkedDates = localStorage.getItem('markedDates');
    if (savedMarkedDates) {
      setMarkedDates(JSON.parse(savedMarkedDates).map((dateString) => new Date(dateString)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('markedDates', JSON.stringify(markedDates));
  }, [markedDates]);
  
  const getFullDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Notez que les mois sont indexés à partir de 0 (janvier = 0)
    const year = date.getFullYear()
    return { day, month, year };
  };

  const handleDateClick = (clickedDate) => {
    // Vous pouvez effectuer ici toute action souhaitée avec la date sélectionnée.
    if (markedDates.some((date) => date.toDateString() === clickedDate.toDateString())){
      setMarkedDates((prevMarkedDates) =>
        prevMarkedDates.filter((date) => date.toDateString() !== clickedDate.toDateString())
      );
    }else{
      setSelectedDate(clickedDate);
    }
    setSelectedDate(clickedDate);
    
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleDateColor = (clickedDate) => {
      setMarkedDates((prevMarkedDates) => [...prevMarkedDates, clickedDate]);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (textareaValue.trim() !== '') {
      const memoDate = textareaValue + '(' + getFullDate(selectedDate).day + '.' + getFullDate(selectedDate).month + '.' + getFullDate(selectedDate).year +')'
      setTaskList((prevTaskList) => [...prevTaskList, memoDate])
      setTextareaValue(''); // Réinitialise le champ du formulaire après soumission
      localStorage.setItem('taskList', JSON.stringify([...taskList, memoDate]));
      handleDateColor(selectedDate)
    }
  };
  
  const handleDeleteTask = (index) => {
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);


    // Mettre à jour le localStorage après la suppression de la tâche
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
  };

  
  return (
    <div className="calendar">
      <div className="month">
        <button onClick={() => changeMonth(-1)}><FcPrevious/></button>
        <h2>
          {currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)}><FcNext/></button>
      </div>
      <div className="weekdays">{getDayNames()}</div>
      <div className="days">{getMonthDays()}</div>
      <div className="today">
         {getFullDate(todayDate).day}/{getFullDate(todayDate).month}/{getFullDate(todayDate).year}
        
      </div>
      <div className="selectedDate">
      {selectedDate && (
        <div style={{color:'#eee'}}>Date sélectionnée : {selectedDate.toLocaleDateString('fr-FR')}&nbsp;&nbsp;
            <div className="add-task">
              <form onSubmit={handleSubmit}>
                <p> Ajouter une tache ?</p>
                <textarea value={textareaValue}
                  onChange={handleTextareaChange}>
                  </textarea>
                  <button type='submit'><FcOk/></button>
              </form>
            </div>
        </div>
      )}
       <div className="memo">
              <p className='title'>Liste mémo</p>
              <div className="list">
                {
                  taskList.map((item,index)=>{
                    return  <p key={index}>+ {item} <FcDeleteDatabase onClick={()=>handleDeleteTask(index)}/></p>
                  })
                }
                </div>
            </div>
      </div>
    </div>
  );
};


export default Calendar;
