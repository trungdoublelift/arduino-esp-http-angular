import { Component } from '@angular/core';
import { collectionData, Firestore, collection, updateDoc, doc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FireSensorApp';
  flag = false;
  tempature = "0";
  limit = "0";

  timeStartFire = {
    hr: 0,
    minutes: 0,
    second: 0,
  };

  date = new Date();
   updateForm=new FormGroup({
    newValue:new FormControl(0,[Validators.required]),
  })

  constructor(private db: Firestore) {


    const fsRef = collection(this.db, 'main')
    collectionData(fsRef).subscribe((data) => {

      this.limit = data[0].limit;
      this.tempature = data[1].temp;
      this.timeStartFire.hr = data[2].hr;
      this.timeStartFire.minutes = data[2].minutes;
      this.timeStartFire.second = data[2].second;
      if (parseFloat(this.limit) <= parseFloat(this.tempature)) {
        this.flag = true;
        if (data[2].hr == 0 && data[2].minutes == 0 && data[2].second == 0) {
          updateDoc(doc(this.db, 'main', 'time'), { hr: this.date.getHours(), minutes: this.date.getMinutes(), second: this.date.getSeconds() })
        }

      } else {
        this.flag = false;
        updateDoc(doc(this.db, 'main', 'time'), { hr: 0, minutes:0, second:0 })
      }
    })

  }

  changeTimer(option: any) {


  }
  ngOnInit(): void {
  }
  async changeLimit() {
    const limitRef = doc(this.db, 'main', 'limit');
    await updateDoc(limitRef, { limit: this.updateForm.controls['newValue'].value })

  }
}
