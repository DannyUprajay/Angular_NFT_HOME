import { Injectable } from '@angular/core';
import {NftInterface} from "../nft.interface";
import {Observable} from "rxjs";
import {result} from "../user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GalleryInterface} from "../gallery.interface";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  getAllGallery(): Observable<GalleryInterface[]>{
    return this.http.get<GalleryInterface[] >("https://danny-webdev.fr/gallery/");
  }

  getGalleryById(id: number): Observable<GalleryInterface> {
    return this.http.get<GalleryInterface>('https://danny-webdev.fr/gallery/' + id);
  }
  deleteGallery(id: number): Observable<GalleryInterface> {
    return this.http.delete<GalleryInterface>('https://danny-webdev.fr/gallery/' + id);
  }

  addGallery(gallery: GalleryInterface, token: string): Observable<result> {
    const body = JSON.stringify(gallery);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<result>('https://danny-webdev.fr/gallery/new', body, { headers });
  }
}
