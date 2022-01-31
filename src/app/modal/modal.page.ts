import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Article } from '../services/feeds.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})

export class ModalPage{

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    urlToImage: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
   });
  constructor(public modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
  onSubmit() {
    this.modalCtrl.dismiss(this.form.value);
  }

}
