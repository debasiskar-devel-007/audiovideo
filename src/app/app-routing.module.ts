import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudioRecorderComponent } from '../app/audio-recorder/audio-recorder.component';
import { VideoRecorderComponent } from '../app/video-recorder/video-recorder.component'


const routes: Routes = [
  {path:'audio-recorder',component: AudioRecorderComponent },
  {path: 'video-recorder',component: VideoRecorderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
