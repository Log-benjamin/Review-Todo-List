import { storageInfo } from './AddandRemoveTask.js';

export function checkbuttonClicked(e) {
  const checkBox = e.target.parentElement.parentElement.children[0].children[0];
  const checkStatus = e.target.parentElement.parentElement.children[0].children[1];

  if (checkBox.checked === true) {
    const Info = JSON.parse(localStorage.getItem('TasksInfo'));
    Info[checkStatus.id - 1].completed = true;
    localStorage.setItem('TasksInfo', JSON.stringify(Info));
    checkStatus.classList.add('Complete');
  } else {
    const Info = JSON.parse(localStorage.getItem('TasksInfo'));
    Info[checkStatus.id - 1].completed = false;
    localStorage.setItem('TasksInfo', JSON.stringify(Info));
    checkStatus.classList.remove('Complete');
  }
}

export function cleartasksDone(e) {
  const store = [];
  let tempStore = storageInfo();
  tempStore.forEach((data) => {
    if (data.completed === false) {
      store.push(data);
    }
  });
  localStorage.setItem('TasksInfo', JSON.stringify(store));
  tempStore = storageInfo();
  let Q = 1;
  for (let i = 0; i < tempStore.length; i += 1) {
    tempStore[i].id = Q;
    Q += 1;
  }

  const listHolder = e.target.parentElement.children[3].children;

  for (let i = 0; i < listHolder.length; i += 1) {
    const innerlistHolder = e.target.parentElement.children[3].children[i].children[0].children[0];
    if (innerlistHolder.checked === true) {
      innerlistHolder.parentElement.parentElement.remove();
    }
  }

  localStorage.setItem('TasksInfo', JSON.stringify(tempStore));
  tempStore = storageInfo();

  for (let i = 0; i < tempStore.length; i += 1) {
    listHolder[i].id = tempStore[i].id;
    listHolder[i].children[0].children[0].id = tempStore[i].id;
    listHolder[i].children[0].children[1].id = tempStore[i].id;
  }
}