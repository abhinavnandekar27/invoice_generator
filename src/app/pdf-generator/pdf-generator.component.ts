import { Component } from '@angular/core';
import { PdfGeneratorService } from '../pdf-generator.service';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent {
  constructor(private pdfGeneratorService: PdfGeneratorService) { }

  public generatePdf(): void {
    this.pdfGeneratorService.generatePdf('contentToConvert', 'sample');
  }
}
