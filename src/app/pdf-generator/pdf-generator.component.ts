import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent {
  companyName: string = 'Company Name';
  companyAddress: string = '1234 Street Address, City, State, 12345';
  companyPhone: string = '(123) 456-7890';
  companyEmail: string = 'info@company.com';

  customerName: string = 'Customer Name';
  customerAddress: string = '5678 Another St, Different City, State, 67890';
  customerPhone: string = '(987) 654-3210';
  customerEmail: string = 'customer@example.com';

  invoiceNumber: string = '001';
  currentDate: string = new Date().toLocaleDateString();

  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  invoiceItems: InvoiceItem[] = [
    { description: 'Product 1', quantity: 0, unitPrice: 0, total: 0 },
    { description: 'Product 2', quantity: 0, unitPrice: 0, total: 0 },
  ];

  selectedItemIndex: number = -1;
  hideButtons: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  addItem(): void {
    this.invoiceItems.push({ description: '', quantity: 0, unitPrice: 0, total: 0 });
  }

  removeItem(index: number): void {
    this.invoiceItems.splice(index, 1);
    this.selectedItemIndex = -1;
    this.calculateSums();
  }

  calculateTotal(item: InvoiceItem): void {
    item.total = item.quantity * item.unitPrice;
    this.calculateSums();
  }

  calculateSums(): void {
    this.totalQuantity = this.invoiceItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.invoiceItems.reduce((sum, item) => sum + item.total, 0);
  }

  generatePdf(): void {
    this.hideButtons = true;
    this.cdr.detectChanges();  // Trigger change detection to hide buttons

    const element = document.getElementById('contentToConvert');
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = (pdf as any).getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
        this.hideButtons = false;
        this.cdr.detectChanges();  // Trigger change detection to show buttons again
      }).catch(() => {
        this.hideButtons = false;
        this.cdr.detectChanges();  // Reset the flag if an error occurs
      });
    } else {
      console.error('Element with id "contentToConvert" not found');
      this.hideButtons = false;
      this.cdr.detectChanges();  // Reset the flag if the element is not found
    }
  }
}
