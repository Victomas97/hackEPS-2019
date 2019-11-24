import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Chart } from 'chart.js';
import { Temperature } from '../models/temperature';
import { RestProvider } from '../api/api';

@Component({
  selector: 'graph-page',
  templateUrl: 'graph.page.html',
  styleUrls: ['graph.page.scss'],
})


export class GraphPage {

  @ViewChild('barChart', { static: false }) barChart;
  @ViewChild('barChart2', { static: false }) barChart2;

  bars: any;
  bars2: any;
  colorArray: any;
  temperatureData: number[] = [];
  temperatureHumityData: number[] = [];
  temperatureTimeData: string[] = [];
  currentTemperature: number = 24;
  lastTemperature: number = 0;
  lastHumity:number = 0;

  temperatureMockData: Temperature;
  temperatureMockDataArray: Temperature[] = [];

  constructor(public restProvider: RestProvider) { }

  ionViewWillEnter() {
    this.getTemperature();
  }

  getTemperature() {

    this.restProvider.getTemperature().subscribe((data: any) => {
      data.data.map((temperatureData: any) => {
        this.temperatureData.push(temperatureData.temperature)
        this.temperatureHumityData.push(temperatureData.humity)
        this.temperatureTimeData.push(temperatureData.time)
        this.currentTemperature = temperatureData.temperature;
        this.createTemperatureChart();
        this.createTemperatureHumityChart();
        this.lastTemperature = temperatureData.temperature;
        this.lastHumity = temperatureData.humity;
      })
    });

  }

  createTemperatureChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.temperatureTimeData,
        datasets: [{
          label: 'Temperatura',
          data: this.temperatureData,
          backgroundColor: 'transparent', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  createTemperatureHumityChart() {
    this.bars2 = new Chart(this.barChart2.nativeElement, {
      type: 'line',
      data: {
        labels: this.temperatureTimeData,
        datasets: [{
          label: 'Humedad',
          data: this.temperatureHumityData,
          backgroundColor: 'transparent', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  change() {
        if(this.currentTemperature > 35) {
          this.currentTemperature = 35;
        }
    }

  changer() {
      if(this.currentTemperature < 14) {
        this.currentTemperature = 14;
      }
      else if(this.currentTemperature > 35) {
        this.currentTemperature = 35;
      }
  }

  postTemperature(number: number) {
    const headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    if (number === -1) {
      this.restProvider.postTemperature(-1);
    }
    else {
      this.restProvider.postTemperature(this.currentTemperature);
    }
  }
}