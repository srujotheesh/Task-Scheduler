document.addEventListener('DOMContentLoaded', function () {
  const clearButton = document.getElementById('clearButton');
  const taskInput = document.getElementById('task');
  const descInput = document.getElementById('desc');
  const enter = document.getElementById('enter');
  const taskList = document.getElementById('taskList');
  const timerElement = document.getElementById('timer');
  const startButton = document.getElementById('sbutton');
  //const stopButton = document.getElementById('ebutton');

  let timerInterval;
  let seconds = 0;

  startButton.addEventListener('click', startTimer);
  //stopButton.addEventListener('click', stopTimer);
  enter.addEventListener('click', handleEnter);

  clearButton.addEventListener('click', function () {
      clearTaskList();
      clearLocalStorage();
  });
  function startTimer() {
    if(startButton.textContent==='Start'){
      startButton.textContent='Stop';
      startButton.style.setProperty('border-color','red');
      startButton.style.setProperty('background-color','red');
    clearInterval(timerInterval)
      seconds = 0;
      timerInterval = setInterval(function () {
          seconds++;
          updateTimerDisplay();
      }, 1000);
  }else{
    startButton.textContent='Start';
    startButton.style.setProperty('background-color','green');
    startButton.style.setProperty('border-color','green');
    clearInterval(timerInterval);
  }
}


  function handleEnter() {
      if (timerInterval) {
        updateTableWithTimer();
        taskInput.value=''
        descInput.value=''
      }
  }

  function updateTimerDisplay() {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      timerElement.textContent = formattedTime;
  }

  function updateTableWithTimer() {
      const newRow = taskList.insertRow();
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);

      // Add the current timer value, task, and desc to the table
      const taskValue = taskInput.value;
      const descValue = descInput.value;
      const duration = timerElement.textContent;

      cell1.textContent = taskValue;
      cell2.textContent = descValue;
      cell3.textContent = duration;

      // Save the task to local storage
      saveTaskToLocalStorage(taskValue, descValue, duration);

      // Reset the timer value
      seconds = 0;
      updateTimerDisplay();
  }

  function clearTaskList() {
      while (taskList.rows.length > 0) {
          taskList.deleteRow(0);
      }
  }

  function clearLocalStorage() {
      localStorage.removeItem('tasks');
  }

  function saveTaskToLocalStorage(task, desc, duration) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({ task, desc, duration });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
          const newRow = taskList.insertRow();
          const cell1 = newRow.insertCell(0);
          const cell2 = newRow.insertCell(1);
          const cell3 = newRow.insertCell(2);
          cell1.textContent = task.task;
          cell2.textContent = task.desc;
          cell3.textContent = task.duration;
      });
  }

  // Load tasks from local storage on page load
  loadTasksFromLocalStorage();
});
