'use strict';

class ToDoList {
  toDo = document.querySelector('.to-do');
  complete = document.querySelector('.completed');

  insertForm() {
    const markup = `
    <div class="to-do-item">
            <form class="form">
              <div class="item-list">
                <input type="text" placeholder="Title" class="title" />

                <input
                  type="text"
                  placeholder="Description"
                  class="description"
                />
                <input type="datetime-local" class="date-time" />

                <input
                  id="save"
                  type="button"
                  class="item-button button-save"
                  value="Save"
                />
              </div>
            </form>
          </div>
    `;
    this.insertMarkup(this.toDo, 'beforeend', markup);
  }

  createToDo(title, description, date) {
    this.title = title.value;
    this.description = description.value;
    this.date = date.value;

    const markup = `
    <div class="to-do-item">
            <ul class="item-list">
              <li>${this.title}</li>
              <li>${this.description}</li>
              <li>${this.date}</li>
              <li>
                <input
                  type="button"
                  id="complete"
                  class="item-button"
                  value="complete"
                />
              </li>
            </ul>
          </div>
    `;
    this.removeForm();
    this.insertMarkup(this.toDo, 'beforeend', markup);
  }

  completeToDo(event) {
    const toDoItem = event.target.closest('.to-do-item');
    this.complete.appendChild(toDoItem);
  }

  insertMarkup(location, position, markup) {
    location.insertAdjacentHTML(position, markup);
  }

  removeForm() {
    this.toDo.removeChild(this.toDo.lastElementChild);
  }
}

const toDoList = new ToDoList();

// OPEN FORM
const btnAdd = document.querySelector('.button-add');

document.addEventListener('click', e => {
  if (e.target.id === 'add') {
    toDoList.insertForm();
  }
});

// FOR PREVENTING MULTIPLE FORMS TO OPEN

// SAVE FORM
const btnSave = document.querySelector('.button-save');
const title = document.querySelector('.title');
const description = document.querySelector('.description');
const dateTime = document.querySelector('.date-time');

document.addEventListener('click', e => {
  if (e.target.id === 'save') {
    toDoList.createToDo(title, description, dateTime);
  }
});

// COMPLETED TO DO

document.addEventListener('click', e => {
  if (e.target.id === 'complete') toDoList.completeToDo(e);
});
