import { Component } from '@angular/core';
import { Database, objectVal, ref, update } from '@angular/fire/database';
import { traceUntilFirst } from '@angular/fire/performance';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'y';
  flag: boolean = false;
  data: any = {
    limit: 0,
    temperature: 0,
  };
  newValue: number = 0;
  // myModal = <HTMLElement>document.getElementById('myModal')
  // myInput = <HTMLElement>document.getElementById('myInput')


  // public readonly testObjectValue$: Observable<any>;
  constructor(private database: Database) {
    const doc = ref(database, '/');
    objectVal(doc).pipe(
      traceUntilFirst('database')
    ).subscribe((data: any) => {
      this.data = data;
      console.log(data);
      if (data.limit <= data.temperature) {
        this.flag = true;
      }
    });
  }
  abc() {
    const doc = ref(this.database, '/');

    update(doc, { limit: this.newValue });
  }
  ngOnInit(): void {
  }
}
