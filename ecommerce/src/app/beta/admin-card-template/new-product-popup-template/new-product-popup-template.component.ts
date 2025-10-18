import {Component, OnInit, signal} from '@angular/core';
import {DialogService} from '../../../services/admin/dialog.service';
import {Dialog} from 'primeng/dialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {InputNumber} from 'primeng/inputnumber';
import {DatePicker} from 'primeng/datepicker';
import {FileUpload} from 'primeng/fileupload';
import {Carousel} from 'primeng/carousel';
import {Select} from 'primeng/select';
import {FilterService} from '../../../services/filter.service';

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
    Carousel,
    Select,
  ],
  templateUrl: './new-product-popup-template.component.html',
  styleUrl: './new-product-popup-template.component.scss'
})
export class NewProductPopupTemplateComponent implements OnInit{
  visible: boolean = false;
  responsiveOptions: any[] | undefined;

  productName: string = '';
  productDesc: string = '';
  price: number | undefined;
  price_valid_from: Date | undefined;
  price_valid_to: Date | undefined;
  readonly huDateFormat: string = 'yy/mm/dd';
  img_sources= signal<string[]>([]);
  leafCategories = signal<any[]>([]);
  selectedCategory: string | undefined;




  constructor(private dialogService: DialogService, private filterService: FilterService) {
    this.dialogService.visible$.subscribe(state => this.visible = state);
  }



  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]

    // leaf categories
    this.loadLeafCategories();
  }

  private loadLeafCategories(): void {
    this.filterService.getCategories().subscribe({
      next: categories => {
        console.log(categories)
        this.leafCategories.set(this.filterService.makeLeafCategoryArray(categories, 'dropdown'));
      },
      error: err => console.error(err)
    })
  }

  uploadImageSource(event: any): void {
    const uploadedFile = event.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const newImg = reader.result as string;

      this.img_sources.update(imgs => [...imgs, newImg]);
    };

    reader.readAsDataURL(uploadedFile);

  }




}
