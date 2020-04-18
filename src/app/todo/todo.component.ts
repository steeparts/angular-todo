import {Component, OnInit} from '@angular/core';
import {Todo, TodoService} from '../services/todo.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  form: FormGroup;
  editableTodo: Todo;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  toggleCompleted(id: number): void {
    this.todoService.toggleCompleted(id);
  }

  add(): void {
    const {title} = this.form.value;

    const todo: Todo = {
      id: Date.now(),
      title: title,
      done: false
    };

    this.form.reset();
    this.todoService.addTodo(todo);
  }

  prepareToEdit(todo: Todo): void {
    this.editableTodo = Object.assign({}, todo);
  }

  edit(todo: Todo): void {
    if (this.editableTodo) {
      const title = todo.title.trim();

      if (!title.length || this.editableTodo.title === title) {
        todo = this.editableTodo;
      }
      this.todoService.editTodo(todo);
      this.editableTodo = undefined;
    }
  }

  remove(id: number): void {
    this.todoService.removeTodo(id);
  }

}
