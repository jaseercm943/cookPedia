import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {
  downloadList: any = []
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllDownloads()
  }

  getAllDownloads() {
    this.api.downloadListAPI().subscribe((res: any) => {
      this.downloadList = res
      console.log(this.downloadList);
    })
  }
}
