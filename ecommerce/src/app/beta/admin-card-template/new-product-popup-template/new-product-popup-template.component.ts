import {Component, OnInit} from '@angular/core';
import {DialogService} from '../../../services/admin/dialog.service';
import {Dialog} from 'primeng/dialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {InputNumber} from 'primeng/inputnumber';
import {DatePicker} from 'primeng/datepicker';
import {FileUpload} from 'primeng/fileupload';
import {Image} from 'primeng/image';

interface FileUploadEvent {
  originalEvent: Event;
  files: File[]
}



@Component({
  selector: 'app-new-product-popup-template',
  imports: [
    Dialog,
    FloatLabel,
    InputText,
    FormsModule,
    Textarea,
    InputNumber,
    DatePicker,
    FileUpload,
    Image,
  ],
  templateUrl: './new-product-popup-template.component.html',
  styleUrl: './new-product-popup-template.component.scss'
})
export class NewProductPopupTemplateComponent {
  visible: boolean = false;

  productName: string = '';
  productDesc: string = '';
  price: number | undefined;
  price_valid_from: Date | undefined;
  price_valid_to: Date | undefined;
  readonly huDateFormat: string = 'yy/mm/dd';
  img_sources: string[] = [];

  constructor(private dialogService: DialogService) {
    this.dialogService.visible$.subscribe(state => this.visible = state);

  }

  uploadImageSource(event: any): void {
    for (let file of event.files) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.img_sources.push(e.target.result);
      }

      reader.readAsDataURL(file);

      console.log(file)
    }

  }
}
