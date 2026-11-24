let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

const taskTemplate = document.querySelector("#to-do__item-template");
const storageKey = "tasks";

function loadTasks() {
  const storedList = localStorage.getItem(storageKey);
  if (storedList === null) {
    return items;
  }
  return JSON.parse(storedList);
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((label) => tasks.push(label.textContent));
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function saveCurrentList() {
  items = getTasksFromDOM();
  saveTasks(items);
}

function prependTask(title) {
  listElement.prepend(createItem(title));
  saveCurrentList();
}

function createItem(item) {
  const clone = taskTemplate.content.firstElementChild.cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;
  editButton.addEventListener("click", () => {
    textElement.contentEditable = "true";
    textElement.focus();
  });
  textElement.addEventListener("blur", () => {
    textElement.contentEditable = "false";
    saveCurrentList();
  });
  duplicateButton.addEventListener("click", () => prependTask(textElement.textContent));
  deleteButton.addEventListener("click", () => {
    clone.remove();
    saveCurrentList();
  });

  return clone;
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = inputElement.value;
  if (title.trim().length === 0) {
    return;
  }
  prependTask(title);
  formElement.reset();
});

items = loadTasks();
items.forEach((title) => listElement.append(createItem(title)));
