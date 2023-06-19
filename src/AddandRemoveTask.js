const TaskListContainer = document.querySelector('.todo-Container');

class CreatetodoList {
  constructor(description, completed, id) {
    this.description = description;
    this.completed = completed;
    this.id = id;
  }

  static displayTasks = (task, onetwo, three) => {
    const listItem = document.createElement('li');
    listItem.id = task.id;
    listItem.className = 'lists';
    listItem.innerHTML = `
          <div class="listLP">
          <input type="checkbox" class="checkB" id="${task.id}" ${onetwo}>
          <p class="${three}" id="${task.id}">${task.description}</p>
          </div>
          
          <div class="trash">
          
          <i id="pen" class="fa-solid fa-pen"></i>
          <i id="delete" class="fa-solid fa-trash-can"></i>
          </div>
          `;

    TaskListContainer.appendChild(listItem);
  };

  static loadFromLocalStorage() {
    let Tasks;

    if (localStorage.getItem('TasksInfo')) {
      Tasks = JSON.parse(localStorage.getItem('TasksInfo'));
    } else {
      Tasks = [];
    }
    return Tasks;
  }

  static displayTasksOnPage() {
    const Tasks = CreatetodoList.loadFromLocalStorage();
    Tasks.forEach((task) => {
      if (task.completed === true) {
        CreatetodoList.displayTasks(task, 'checked', 'completeTask');
      } else {
        CreatetodoList.displayTasks(task, '/', 'none');
      }
    });
  }

  static removeBookFromPage(target) {
    if (target.classList.contains('trash')) {
      target.parentElement.remove();
    }
  }

  static removeFromLocalStorage(element) {
    let k = 0;
    const Tasks = CreatetodoList.loadFromLocalStorage();

    const idd = element.parentElement.id;
    const newID = Number(idd);
    for (let i = 0; i < Tasks.length; i += 1) {
      if (Tasks[i].id === newID) {
        k = i;
        break;
      }
    }
    Tasks.splice(k, 1);
    let X = 1;
    Tasks.forEach((task) => {
      task.id = X;
      X += 1;
    });
    localStorage.setItem('TasksInfo', JSON.stringify(Tasks));
  }
}

export const removeItem = (e) => {
  CreatetodoList.removeBookFromPage(e.target.parentElement);
  CreatetodoList.removeFromLocalStorage(e.target.parentElement);
};

export const displayTasksOnWebPage = () => {
  CreatetodoList.displayTasksOnPage();
};

export const addItem = () => {
  const addInput = document.querySelector('.add-input');

  if (addInput.value) {
    const complete = false;

    const loadTasks = CreatetodoList.loadFromLocalStorage();
    const count = loadTasks.length + 1;
    const newTask = new CreatetodoList(addInput.value, complete, count);

    loadTasks.push(newTask);

    CreatetodoList.displayTasks(newTask);
    localStorage.setItem('TasksInfo', JSON.stringify(loadTasks));

    // Reset input fields
    addInput.value = '';
  }
};

export const storageInfo = CreatetodoList.loadFromLocalStorage;