import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonInput, IonButton,
  IonLabel, IonList, IonItem
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
import { Data } from '../interfaces/data';
import { ProviderService } from '../services/provider.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
    HttpClientModule, ReactiveFormsModule,
    CommonModule,
    IonLabel, IonList, IonItem,
    IonInput, IonButton,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent
  ],
  providers: [ProviderService],
})
export class Tab1Page {

  public data: Data[] = [];

  checkoutForm = this.formBuilder.group({
    texto: ''
  });

  constructor(private dataProvider: ProviderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.dataProvider.getResponse().subscribe( response => {
      if( response != null) {
        this.data = Object.values(response) as Data[]
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
