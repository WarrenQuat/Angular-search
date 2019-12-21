import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphComponent } from './components/graph/graph.component';
import { GraphItemComponent } from './components/graph-item/graph-item.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    GraphItemComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
