import { Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { collectionData, Firestore, collection, updateDoc, doc, addDoc, collectionChanges, docData } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UIChart } from "primeng/chart/chart"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { LimitModalComponent } from './components/limit-modal/limit-modal.component';
import { Datasets } from './dataset.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'fire-alarm';
@ViewChild("chart") chart!: UIChart;
  private componentDestroyed = new Subject<any>();
  data: { labels: string[], datasets: Array<Datasets> };
  options: any;
  constructor(private db: Firestore, private modalService: NgbModal) {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Temperature',
          data: []
        },
      ]
    }

    this.options = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  };

  public alarm: boolean = false;
  public limit: any = 0;
  public date: any = {
    hr: 0,
    min: 0,
    date: 0,
    month: 0,
    year: 0
  };
    public tempArray: any = [];
  public temp: any = 0;
  public hasFire: boolean = false;
  public fireStartAt: any = {
    hr: 0,
    min: 0
  }

  public dateFormat: any;
  ngOnInit(): void {
    /// KÉo dữ liệu firebase vô chart tại đây .....
    setInterval(()=>{
      /// Cột X theo thời gian
      this.data.labels.push((Math.floor(Math.random() * 100)).toString())
      if(this.data.labels.length >=10){
        this.data.labels.shift();
      }
      // Cột Y theo nhiệt độ
      if(this.data.datasets[0].data!.length >=10){
        this.data.datasets[0].data!.shift();
      }
      this.data.datasets[0].data?.push((Math.floor(Math.random() * 100)).toString());

      console.log(this.data.datasets[0].data);
      this.chart.reinit();
    },2000)

    this.start();

  }

  start() {
    const fsRef = collection(this.db, 'main');
    const chartRef = collection(this.db, 'ChartData');

    collectionData(fsRef).pipe(takeUntil(this.componentDestroyed)).subscribe((data: any) => {

      this.alarm = data[0].alarm;
      this.limit = data[1].limit;
      this.temp = data[2].temp;



      this.data.datasets[0].data = localStorage.getItem('temp')?.split(',');
      let currDate = new Date(data[2].date);
      this.date = {
        hr: currDate.getHours(),
        min: currDate.getMinutes(),
        date: currDate.getUTCDate(),
        month: currDate.getUTCMonth() + 1,
        year: currDate.getUTCFullYear()
      }
      if (this.limit <= this.temp) {
        if (this.hasFire == false) {
          updateDoc(doc(this.db, 'main', 'time'), { date: Date.now() })
          this.hasFire = true;
          // this.dateFormat = new Date(data[2].date);
          let temp = new Date(data[3].date);
          this.dateFormat = temp.getUTCDate() + "-" + (temp.getUTCMonth() + 1) + '-' + temp.getUTCFullYear() + " " + temp.getHours() + ":" + temp.getMinutes();
        }
      } else {
        this.hasFire = false;
        this.dateFormat = 0;
      }
    })

  }

  openModal() {

    const modalRef = this.modalService.open(LimitModalComponent);
    modalRef.componentInstance.limit = this.limit;
    modalRef.result.then((res: any) => {
      if (res !== false) {
        this.updateLimit(res);
      }
    });

  }


  async updateLimit(limit: number) {
    const limitRef = doc(this.db, 'main', 'limit');
    await updateDoc(limitRef, { limit: limit });
  }
  async turnAlarm(temp: any) {
    if (temp == 'on') {
      await updateDoc(doc(this.db, 'main', 'alarm'), { alarm: true })
    }
    else {
      await updateDoc(doc(this.db, 'main', 'alarm'), { alarm: false })
    }

  }
  ngOnDestroy() {
    this.componentDestroyed.next();

  }
  initChart() {
  }
}
