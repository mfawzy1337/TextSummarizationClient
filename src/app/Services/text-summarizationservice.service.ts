import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextSummarizationserviceService {
  private apiUrl = 'http://127.0.0.1:8000/summarize'; 
  constructor(private http: HttpClient) { }

  postMessage(messageData: { content: string }): Observable<any> {
    return this.http.post(this.apiUrl, messageData);
  }

}
