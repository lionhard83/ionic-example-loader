import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Source {
    id: string;
    name: string;
}

export interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}

export interface RootObject {
    status: string;
    totalResults: number;
    articles: Article[];
}


@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  host =  'https://newsapi.org/v2';
  country = 'it';
  apiKey = '48d7ba366c4a49f2a7781a68fd020291';
  constructor(private httpClient: HttpClient) {}

  topNews(): Promise<RootObject> {
    const url = `${this.host}/top-headlines?country=${this.country}&apiKey=${this.apiKey}`;
    return this.httpClient.get<RootObject>(url).toPromise();
  }

  search(stringToSearch: string): Promise<RootObject> {
    const url = `${this.host}/everything?q=${stringToSearch}&apiKey=${this.apiKey}`;
    return this.httpClient.get<RootObject>(url).toPromise();
  }

  byCategory(category: string): Promise<RootObject> {
    const url = `${this.host}/top-headlines?category=${category}&apiKey=${this.apiKey}`;
    return this.httpClient.get<RootObject>(url).toPromise();
  }
}
