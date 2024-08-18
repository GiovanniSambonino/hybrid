import { Component, OnInit, Input } from '@angular/core';
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

  @Input() data: string = ''; 

  public datadb : Data[] = [];
  private tipoRespuesta: string = ''; 

  checkoutForm = this.formBuilder.group({
    texto: ''
  });

  constructor(private dataProvider: ProviderService , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tipoRespuesta = this.data;
    this.loadData()
  }

  loadData() {
    this.dataProvider.getResponse(this.tipoRespuesta).subscribe( response => {
      if( response != null) {
        this.datadb = Object.values(response) as Data[]
      }
        
    })
  }

  onSubmit(): void {
    const response = {
      texto: this.checkoutForm.value.texto,
      tipo: this.tipoRespuesta  // Enviar 'Anuncio' o 'Tarea' según corresponda
    };

    this.dataProvider.postResponse(this.tipoRespuesta, response).subscribe(() => {
      this.checkoutForm.reset();
      this.loadData();  // Vuelve a cargar las respuestas
    });
  }

}
