'use strict';

class ToDoList {
  todo = document.querySelector('.to-do');
  complete = document.querySelector('.completed');
  state = {
    toDo: [],
    complete: [],
  };

  addToState(title, description = 'n/a', date = 'n/a') {
    const data = {
      title,
      description,
      date,
      id: this.state.toDo.length + this.state.complete.length + 1,
    };
    this.state.toDo.push(data);
  }

  removeFromState() {}

  renderState() {
    // clear render TODO
    const toDos = Array.from(this.todo.children);
    toDos.forEach(el => {
      if (el.id) this.todo.removeChild(el);
    });

    // clear render COMPLETE
    const completed = Array.from(this.complete.children);
    completed.forEach(el => {
      if (el.id) this.complete.removeChild(el);
    });
    // toDo
    if (this.state.toDo.length > 0) {
      this.state.toDo.forEach(obj => {
        const markup = `
        <div id="${obj.id}" class="to-do-item">
        <ul class="item-list">
        <li>${obj.title}</li>
        <li>${obj.description}</li>
        <li>${obj.date}</li>
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

        this._insertHTML(this.todo, 'beforeend', markup);
      });
    }

    // completed

    this.state.complete.forEach(obj => {
      const markup = `
          <div id="${obj.id}" class="to-do-item">
            <ul class="item-list">
              <li>${obj.title}</li>
              <li>${obj.description}</li>
              <li>${obj.date}</li>
              <li>
                <input
                  type="button"
                  id="remove"
                  class="item-button"
                  value="remove"
                />
              </li>
            </ul>
          </div>
      `;
      this._insertHTML(this.complete, 'afterbegin', markup);
    });
  }

  completeToDo(item) {
    const completedItem = this.state.toDo.find(el => el.id === Number(item.id));
    this.state.toDo.splice(this.state.toDo.indexOf(completedItem), 1);
    this.state.complete.push(completedItem);
    this.renderState();
  }

  renderForm() {
    const toDoChild = this.todo.children[0].children[0];
    const formEl = [...toDoChild.children[0].children];
    formEl.forEach(el => {
      if (el.id !== 'save') el.value = '';
    });
    if (
      toDoChild.classList.contains('form') &&
      toDoChild.closest('.to-do-item').classList.contains('hidden')
    ) {
      toDoChild.closest('.to-do-item').classList.toggle('hidden');
    }
  }

  removeForm() {
    const toDoChild = this.todo.children[0].children[0];
    toDoChild.closest('.to-do-item').classList.toggle('hidden');
  }

  _insertHTML(location, position, markup) {
    location.insertAdjacentHTML(position, markup);
  }
}

const toDoList = new ToDoList();

// ADD FORM
document.addEventListener('click', e => {
  if (e.target.id === 'add') {
    toDoList.renderForm();
  }
});

document.addEventListener('click', e => {
  if (e.target.id === 'save') {
    const parentEl = e.target.closest('.to-do-item');
    const title = parentEl.querySelector('.title').value;
    const description = parentEl.querySelector('.description').value;
    const date = parentEl.querySelector('.date-time').value;
    if (title) {
      toDoList.addToState(title, description, date);
      toDoList.renderState();
      toDoList.removeForm();
    } else alert('No Title');
  }
});

document.addEventListener('click', e => {
  if (e.target.id === 'complete') {
    const item = e.target.closest('.to-do-item');
    toDoList.completeToDo(item);
  }
});

// btnComplete(){
//   toDoList.completeToDo()
//   toDoList.renderState()
// }

// btnRemove(){
//   toDoList.removeFromState()
//   toDoList.renderState()
// }
