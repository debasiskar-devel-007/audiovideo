import { Component, OnInit } from '@angular/core';
import  {AppComponent} from '../app.component';
import { DomSanitizer } from '@angular/platform-browser';
import {  FileUploader } from 'ng2-file-upload';
import * as RecordRTC from 'recordrtc';
// import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import {HttpServiceService} from '../http-service.service';
var $: any;
// import { MatSnackBar } from '@angular/material/snack-bar';
const uploadAPI = 'http://127.0.0.1:8000/api/upload';
@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.css']
})
export class AudioRecorderComponent implements OnInit {
  isRecording = false;
  recordedTime;
  public blobUrl:any;
  public blobUrl1:any;
  public fileUploadProgress: string = null;
  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["wav", "mp3"], // use all small font
    type: "patient-file",
    path: "patientFile",
    prefix: "patient-file",
    formSubmit: false,
    conversionNeeded: 1,
    bucketName: ""
  }
  constructor(public appcomponent:AppComponent, public sanitizer: DomSanitizer,public http:HttpServiceService) {
    this.appcomponent.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.appcomponent.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.appcomponent.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.blobUrl1 = data.blob;
      console.log('====================',this.blobUrl1);  
    });
   }

  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
  ngOnInit() {
    this.abortRecording();
    // this.onClick();
  }
  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.appcomponent.startRecording();
    }
  }
  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.appcomponent.abortRecording();
    }
  }
  onClick() {
    const formData = new FormData();
    formData.append('file', this.blobUrl1);
    formData.append('bucketname','testimonial-assets');
    this.fileUploadProgress = '0%';
 
    this.http.httpViaPost('uploads', formData)
    .subscribe(events => {
      console.log(events)   
    }) 
}

  stopRecording() {
    if (this.isRecording) {
      this.appcomponent.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

}
