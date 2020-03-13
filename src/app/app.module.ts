import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioRecorderComponent } from './audio-recorder/audio-recorder.component';
import { VideoRecorderComponent } from './video-recorder/video-recorder.component';
// import { FileUploadModule} from 'file-upload-lib-influxiq';
import {DemoMaterialModule} from '../app/materialModule';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AudioRecorderComponent,
    VideoRecorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    DemoMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
