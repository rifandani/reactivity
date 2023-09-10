/**
 * @typedef {{ id: number; text: string; }} Todo
 */

/**
 * @param {Todo} todo
 */
function TodoComponent(todo) {
  return `<li id="todo-${todo.id}">${todo.text}</li>`;
}

/**
 * @param {Todo[]} todos
 */
function TodoListComponent(todos) {
  return `<ul class="flex flex-col space-y-2">
  ${todos.map(TodoComponent).join('')}
  </ul>`;
}
