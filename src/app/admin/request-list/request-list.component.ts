import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
  feedbackList: any = []
  updateLoading: boolean = false

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllFeedbacks()
  }

  getAllFeedbacks() {
    this.api.getFeedbackListAPI().subscribe((res: any) => {
      this.feedbackList = res
      console.log(this.feedbackList);
    })
  }

  updateFeedbackStatus = (id: string, status: string) => {
    this.updateLoading = true;
    this.api.updateFeedbackStatusAPI(id, status).subscribe((res: any) => {
      console.log(res)
      this.getAllFeedbacks()
      this.updateLoading = false
    })
    this.updateLoading = false
  }
}
