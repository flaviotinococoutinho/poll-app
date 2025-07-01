import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagePoll } from '../../models/page-poll.model';
import { Poll } from '../../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = 'http://localhost:8080/api/poll/';
  }

  findAll() {
    return this.http.get<Poll[]>(this.url);
  }

  findAllPagedAuth(page: number) {
    let urlWithParam = 'http://localhost:8080/api/poll/authorized?page=' + page + '&size=4';
    return this.http.get<PagePoll>(urlWithParam);
  }

  findAllPaged(page: number) {
    let urlWithParam = 'http://localhost:8080/api/poll?page=' + page + '&size=4';
    return this.http.get<PagePoll>(urlWithParam);
  }

  findByUser(page: number){
    let urlWithParam= 'http://localhost:8080/api/poll/my/all?page=' + page + '&size=4';
    return this.http.get<PagePoll>(urlWithParam);
  }

  findById(id: number) {
    return this.http.get<Poll>(this.url + id);
  }

  vote(votes: number[]) {
    return this.http.put(this.url, votes);
  }

  save(poll: Poll) {
    return this.http.post(this.url, poll);
  }

  updateOne(poll:Poll) {
    return this.http.put(this.url + 'edit', poll);
  }

  updateMany(polls: Poll[]) {
    return this.http.put(this.url + 'all', polls);
  }

  getTime(){
    return this.http.get('http://localhost:8080/api/time');
  }
}
