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
  botTyping: boolean = false;

  constructor(private service:TextSummarizationserviceService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.getBotResponse(this.userInput);
      this.userInput = '';
    }
  }

  getBotResponse(userMessage: string) {
    this.botTyping = true;
    this.service.postMessage({content:userMessage}).subscribe(
      (response) => {
        const botMessage = `Bot: Response: "${response.summary}"`;
        // this.messages.push({ text: botMessage, sender: 'bot' });
        this.simulateTyping(botMessage);
      },
      (error) => {
        console.error('Error posting message', error);
      });
  }

  simulateTyping(botMessage: string) {
    this.botTyping = true;
    let displayedText = '';
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < botMessage.length) {
        displayedText += botMessage.charAt(index);
        index++;
        // Update the message as it's being typed
        if (this.messages[this.messages.length - 1].sender !== 'bot') {
          this.messages.push({ text: '', sender: 'bot' });
        }
        this.messages[this.messages.length - 1].text = displayedText;
      } else {
        clearInterval(typingInterval);
        this.botTyping = false;  // Typing finished
      }
    }, 50); // Adjust speed by changing the timeout value
  }
}