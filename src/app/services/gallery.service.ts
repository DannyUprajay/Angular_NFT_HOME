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
    return this.http.get<GalleryInterface[] >("https://127.0.0.1:8000/gallery/");
  }

  getGalleryById(id: number): Observable<GalleryInterface> {
    return this.http.get<GalleryInterface>('https://127.0.0.1:8000/gallery/' + id);
  }
  deleteGallery(id: number): Observable<GalleryInterface> {
    return this.http.delete<GalleryInterface>('https://127.0.0.1:8000/gallery/' + id);
  }

  addGallery(gallery: GalleryInterface, token: string): Observable<result> {
    const body = JSON.stringify(gallery);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<result>('https://127.0.0.1:8000/gallery/new', body, { headers });
  }
}
