import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('data') data: any;

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [100, 100, 100],

  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {

   }

  ngOnInit(): void {
    //console.log('data', this.data);
    this.doughnutChartLabels = this.data.labels;
    this.doughnutChartData = this.data.data;
    this.doughnutChartType = this.data.type;

  }

}
