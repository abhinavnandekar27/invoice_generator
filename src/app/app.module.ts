import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { PdfGeneratorService } from './pdf-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    PdfGeneratorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PdfGeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
