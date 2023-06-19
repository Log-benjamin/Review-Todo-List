import './style.css';
import Icon from './large_notimewasted.png';
import {
  displayTasksOnWebPage, addItem, removeItem,
  storageInfo,
} from './AddandRemoveTask.js';
import { cleartasksDone, checkbuttonClicked, checkingTheEdit } from './ClearDoneTask.js';

const TaskListContainer = document.querySelector('.todo-Container');
const clearcompleteTasks = document.querySelector('.clearBtn');
const addInTodo = document.querySelector('.fa-plus');
const appLogo = document.querySelector('.logo');
const myIcon = new Image();

myIcon.src = Icon;
appLogo.appendChild(myIcon);

document.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addItem();
  }
});

addInTodo.addEventListener('click', (e) => {
  e.preventDefault();
  addItem();
});

TaskListContainer.addEventListener('click', (e) => {
  if (e.target.id === 'delete') {
    removeItem(e);
  }
  const checkMark = document.createElement('button');
  const insertInput = document.createElement('input');

  if (e.target.id === 'pen') {
    e.target.addEventListener('click', () => {
      insertInput.remove();
      checkMark.remove();
    });

    const top = e.target.parentElement.parentElement.children[0];
    const targetElement = e.target.parentElement.parentElement.children[0].children[1];

    checkMark.className = 'checkEdit';
    checkMark.innerHTML = '<i class="fa-solid fa-check fa-2xl"></i>';
    insertInput.placeholder = 'Edit your task';
    insertInput.type = 'text';
    insertInput.className = 'editInput';
    top.appendChild(insertInput);
    top.appendChild(checkMark);

    const one = e.target.parentElement.parentElement.children[0].children[3];
    if (one.className === 'checkEdit') {
      checkingTheEdit(e);
    }
  }
  if (e.target.className === 'checkB') {
    checkbuttonClicked(e);
  }
});

clearcompleteTasks.addEventListener('click', (e) => {
  cleartasksDone(e);
  window.location.reload();
});

window.addEventListener('load', () => {
  displayTasksOnWebPage();
});