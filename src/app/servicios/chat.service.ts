import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Message } from 'src/app/interfaces/message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection?: AngularFirestoreCollection<any>;
  public chats: Message[] = [];
  public user: any = {};
  elements: any;

  constructor(private authService: AuthService,
              private afs: AngularFirestore) {
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.uid = user.uid;
        this.user.email = user.email;
      }

    });
    }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(20));
    return this.itemsCollection.valueChanges().subscribe(chats => {
      this.chats = [];
      for (let chat of chats) {
        this.chats.unshift(chat);
      }
      setTimeout(() => {
        this.elements = document.getElementById('app-message');
      }, 20);
    });
  }

  addMessage(message: string) {
    let newMessage: Message = {
      name: this.user.name,
      message: message,
      date: this.formatDate(new Date()),
      email: this.user.email,
    };

    return this.itemsCollection?.add(newMessage);
  }

  formatDate = (date: any) => {
    return date.toLocaleString()
  }
}
