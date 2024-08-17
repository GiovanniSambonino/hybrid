import { Component, OnInit, input } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonNavLink, IonButton, IonButtons, IonBackButton, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonInput,
  IonLabel, IonList, IonItem
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'
import { HttpClientModule } from  '@angular/common/http';
import { Data } from '../../../app/interfaces/data';
import { ProviderService } from '../../services/provider.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonNavLink, 
    IonButton, IonButtons, IonBackButton,
    HttpClientModule, ReactiveFormsModule,
    CommonModule, 
    IonLabel, IonList, IonItem,
    IonInput,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent],
    providers: [ProviderService]

})
export class ModalComponent implements OnInit {

  data = input(0)
  public datadb : Data[] = [];

  checkoutForm = this.formBuilder.group({
    texto: ''
  });

  constructor(private dataProvider: ProviderService , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.dataProvider.getResponse().subscribe( response => {
      if( response != null) {
        this.datadb = Object.values(response) as Data[]
      }
        
    })
  }

  onSubmit(): void {
    this.dataProvider.postResponse(this.checkoutForm.value).subscribe( (response) => {
            this.checkoutForm.reset();
            this.loadData()
    })
  }

}
