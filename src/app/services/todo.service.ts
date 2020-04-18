import {Injectable} from '@angular/core';

export interface Todo {
  id: number,
  title: string,
  done: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: Todo[] = [];

  constructor() {
    const localStorageTodoList = JSON.parse(localStorage.getItem('todoList'));
    this.todoList = localStorageTodoList !== null ? localStorageTodoList : [];
  }

  private updateTodoList(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  toggleCompleted(id: number): void {
    const index = this.todoList.findIndex(t => t.id === id);
    this.todoList[index].done = !this.todoList[index].done;
    this.updateTodoList();
  }

  addTodo(todo: Todo): void {
    this.todoList.push(todo);
    this.updateTodoList();
  }

  editTodo(todo: Todo): void {
    const index = this.todoList.findIndex(t => t.id === todo.id);
    this.todoList[index] = todo;
    this.updateTodoList();
  }

  removeTodo(id: number): void {
    this.todoList = this.todoList.filter(t => t.id !== id);
    this.updateTodoList();
  }
}
