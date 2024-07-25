document.addEventListener('DOMContentLoaded', () => {
    // Refresh Button
    document.getElementById('refresh').addEventListener('click', () => {
      location.reload();
    });
  
    // To-Do List Functionality
    const form = document.getElementById('todoForm');
    const taskList = document.getElementById('taskList');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const newTask = document.getElementById('newTask').value;
      if (newTask.trim() !== '') {
        addTask(newTask);
        document.getElementById('newTask').value = '';
      }
    });
  
    function addTask(taskText) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = taskText;
  
      const actions = document.createElement('div');
      actions.classList.add('task-actions');
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editTask(li, span));
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(li));
  
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complete';
      completeButton.addEventListener('click', () => li.classList.toggle('completed'));
  
      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
      actions.appendChild(completeButton);
  
      li.appendChild(span);
      li.appendChild(actions);
      taskList.appendChild(li);
    }
  
    function editTask(li, span) {
      const newTaskText = prompt('Edit your task:', span.textContent);
      if (newTaskText !== null && newTaskText.trim() !== '') {
        span.textContent = newTaskText;
      }
    }
  
    function deleteTask(li) {
      taskList.removeChild(li);
    }
  
    // Scroll animations using Intersection Observer
    const options = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    document.querySelectorAll('.card').forEach(card => {
      observer.observe(card);
    });
  });
  