import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSidebarOpen: boolean = true

  columnWidth: string = "col-lg-9"

  totalUsers: number = 0
  totalRecipeDownloads: number = 0
  totalRecipeCount: number = 0
  totalPendingRequests: number = 0

  selected = new Date()

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions = {};

  constructor(private api: ApiService) {

    if (sessionStorage.getItem("chart")) {
      let chartData = JSON.parse(sessionStorage.getItem("chart") || " ")
      this.chartOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Analysis of Download Recipe Based on Cuisine',
          align: 'left'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total Download Recipe Count'
          }
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: 'Cuisine',
            colorByPoint: true,
            type: 'bar',
            data: chartData
          }
        ]
      }
    }

  }

  ngOnInit() {
    this.getTotalUserCount()
    this.getUserRecipeDownloads()
    this.getAllRecipesCount()
    this.getAllPendingRequests()
  }

  menuButtonClicked() {
    this.isSidebarOpen = !this.isSidebarOpen
    this.columnWidth = "col"
  }

  logout() {
    sessionStorage.clear()
    // this.router.navigateByUrl('/')
  }

  getTotalUserCount() {
    this.api.allUserAPI().subscribe((res: any) => {
      // console.log(res);

      this.totalUsers = res?.length
      // console.log(this.totalUsers);
    })
  }

  getUserRecipeDownloads() {


    this.api.downloadListAPI().subscribe((res: any) => {
      // console.log(res);
      this.totalRecipeDownloads = res.reduce((sum: number, recipe: any) => sum + recipe.count, 0)
      console.log(this.totalRecipeDownloads);

    })
  }

  getAllRecipesCount = () => {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      // console.log(res)
      this.totalRecipeCount = res?.length
      // console.log(this.totalRecipeCount)
    })
  }

  getAllPendingRequests() {
    this.api.getFeedbackListAPI().subscribe((res: any) => {
      // console.log(res)
      this.totalPendingRequests = res?.filter((item: any) => item.status == 'Pending').length
      // console.log('pen', this.totalPendingRequests);
    })
  }

}
