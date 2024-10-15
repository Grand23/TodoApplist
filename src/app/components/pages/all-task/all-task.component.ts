import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent {
  newTask = '';
  intialTaskList: any[] = [];
  taskList: any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);
  ngOnInit() {
    this.stateService.searchSubject.subscribe((value: string) => {
      console.log("search",value)
      if (value) {
        this.taskList = this.intialTaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      }else{
        this.taskList=this.intialTaskList;
      }
    });
    this.getAllTasks();
  }
  addTask() {
    console.log('addTask', this.newTask);
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = '';
      this.getAllTasks();
    });
  }
  saveToFile() {
    const textToSave = this.newTask;
    const textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    const textToSaveAsURL = URL.createObjectURL(textToSaveAsBlob);
    const a = document.createElement('a');
    a.download = 'task.txt';
    a.href = textToSaveAsURL;
    a.click();
  }
  
  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.intialTaskList = this.taskList = result;
    });
  }
  onComplete(task: any) {
    task.completed = true;
    console.log('complete', task);
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
  onImportant(task: any) {
    task.important = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
}
