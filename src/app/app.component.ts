import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextSummarizationserviceService } from './Services/text-summarizationservice.service';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  userInput: string = '';

  constructor(private service:TextSummarizationserviceService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.getBotResponse(this.userInput);
      this.userInput = '';
    }
  }

  getBotResponse(userMessage: string) {
    // Simulate bot response with a delay
    this.service.postMessage({content:userMessage}).subscribe(
      (response) => {
        const botMessage = `Bot: Response to "${response.summary}"`;
        this.messages.push({ text: botMessage, sender: 'bot' });
      },
      (error) => {
        console.error('Error posting message', error);
      })
    setTimeout(() => {
    }, 1000);
  }
}