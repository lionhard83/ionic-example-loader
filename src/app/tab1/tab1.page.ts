import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Article, FeedsService } from '../services/feeds.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  articles: Article[] = null;
  textToSearch = '';
  categories: {key: string; icon: string}[] = [
    {key: 'business', icon: 'business-outline'},
    {key: 'sport', icon: 'trophy-outline'},
    {key: 'science', icon: 'planet-outline'},
    {key: 'health', icon: 'fitness-outline'},
    {key: 'entertaiment', icon: 'videocam-outline'},
    {key: 'general', icon: 'apps-outline'},
  ];

  constructor(
    private feedsService: FeedsService,
    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController
    ){}
  async ngOnInit() {
    this.articles = null;
    this.articles = (await this.feedsService.topNews()).articles;
  }

  async searchTo() {
    this.articles = null;
    this.articles = (await this.feedsService.search(this.textToSearch)).articles;
  }

  async searchByCategory(category: string) {
    this.articles = null;
    this.articles = (await this.feedsService.byCategory(category)).articles;
  }

  // async showModal() {
  //   const modal = await this.modalCtrl.create({ component: ModalPage });
  //   await modal.present();
  //   modal.onDidDismiss().then(({data}) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //     data && this.articles.unshift(data as Article);
  //   });
  // }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Categorie',
      buttons: this.categories.map(({key, icon}) =>
        ({
          text: key.toUpperCase(),
          icon,
          handler: async () => {
            this.articles = null;
            this.searchByCategory(key);
          }
        })
      )
    });
    await actionSheet.present();
  }

}
