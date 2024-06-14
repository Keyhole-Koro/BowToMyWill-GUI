import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BlockComponent } from './block/block.component';
import { PresetMenuComponent } from './preset-menu/preset-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PresetMenuComponent,
    BlockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
