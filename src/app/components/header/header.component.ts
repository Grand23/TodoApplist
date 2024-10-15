import { Component, inject } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { debounceTime } from "rxjs";
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styles: '',
})
export class HeaderComponent {
searchTasks() {
  const searchValue = this.searchControl.value;
  // Display the information typed
  console.log(searchValue);

}
  stateService = inject(StateService);
  searchControl = new FormControl('');
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((value: any) => {
      this.stateService.searchSubject.next(value || '');
    });
  }
}
