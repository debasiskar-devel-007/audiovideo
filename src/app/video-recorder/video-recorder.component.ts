import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.css']
})
export class VideoRecorderComponent implements OnInit {
  private stream: MediaStream;
  private recordRTC: any;

  @ViewChild('video',{static: true}) video;
  // @ViewChild('videoElement') videoElement

  constructor(public http:HttpServiceService) { }

  ngOnInit() {
    // set the initial state of the video
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    const mediaStream = new MediaStream();
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = mediaStream;
    this.toggleControls();
  }

  errorCallback() { 
    //handle error here
  }

  // check() {
  //   var mediaConstraints = {
  //     audio: true,
  //     video: {
  //       width: 1280,
  //       height: 720
  //   }
  //   };
  //   let video: HTMLVideoElement = this.video.nativeElement;
  //     navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
  //     video.srcObject = stream;
  //     stream.getTracks().forEach(function(track) {
  //         console.log(track.getSettings());
  //     })
  // });
  // }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    var recordedBlob = recordRTC.getBlob();
    console.log('++++++++++++',recordedBlob);
    recordRTC.getDataURL(function (dataURL) { });
  }

  startRecording() {
    let video: HTMLVideoElement = this.video.nativeElement;
    var mediaConstraints = {
      audio: true,
      video: {
        width: 1280,
        height: 720
    }
    };
    // let stream = this.stream;
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      // .then(this.successCallback.bind(this), this.errorCallback.bind(this));
      .then(this.successCallback.bind(this),stream => video.srcObject = stream)

  }

  stopRecording() {
    // this.successCallback.bind(this)
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
  //   navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
  //     video.srcObject = stream;
  //     stream.getTracks().forEach(function(track) {
  //         console.log(track.getSettings());
  //     })
  // });
  stream.getAudioTracks().forEach(track => track.stop());
  stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save('video.webm');
  }

  onClick() {
    let recordRTC = this.recordRTC;
    const formData = new FormData();
    formData.append('file', recordRTC.getBlob());
    formData.append('bucketname','testimonial-assets');
 
    this.http.httpViaPost('uploads', formData)
    .subscribe(events => {
      console.log(events)   
    }) 
}

}
