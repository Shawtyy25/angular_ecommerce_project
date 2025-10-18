import {Component, computed, OnInit, signal} from '@angular/core';
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
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {InputErrorDirective} from '../../../directives/input-error.directive';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';

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
    Button,
    InputErrorDirective,
    ConfirmDialog,
    Toast,
  ],
  templateUrl: './new-product-popup-template.component.html',
  styleUrl: './new-product-popup-template.component.scss',
  providers: [ConfirmationService, MessageService]
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

  isInputValid: boolean = true;


  //add new product
  loading: boolean = false;

  // validating


  constructor(private dialogService: DialogService, private filterService: FilterService, private confirmationService: ConfirmationService) {
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

    //validation
    this.isInputValid = true;
  }

  private loadLeafCategories(): void {
    this.filterService.getCategories().subscribe({
      next: categories => {
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

  load() {
    this.validateInputs();

    if (this.isInputValid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.visible = false;

        setTimeout(() => this.dialogService.hide(), 300);
      }, 1000);
    } else {
      return
    }



  }

  validateInputs(): void {
    this.isInputValid = !!(this.productName &&
      this.price &&
      this.price_valid_from &&
      this.selectedCategory);

  }

  clearValidations(): void {
    this.isInputValid = true;
  }

  confirmReset() {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Do you want to reset all fields?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.resetForm(),
      reject: () => {},
    });
  }

  private resetForm() {
    this.productName = '';
    this.productDesc = '';
    this.price = undefined;
    this.price_valid_from = undefined;
    this.price_valid_to = undefined;
    this.selectedCategory = undefined;
    this.img_sources.set([]);
    this.isInputValid = true;
  }
}
