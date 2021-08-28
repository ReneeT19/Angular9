import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    // this.fetchPosts();
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    //move the code below to the posts.service.ts and inject it here in the constructor and call it here
    this.postsService.createAndStorePost(postData.title, postData.content);
    // this.http.post<{name: string}>(
    //   'https://ng-complete-guide-c8aa6-default-rtdb.firebaseio.com/posts.json',
    //   postData
    // )
    // .subscribe(responseData => {
    //   console.log(responseData);
    // });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  // private fetchPosts() {
  //   this.isFetching = true;
  //   //move it to service as well
  //   // this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-c8aa6-default-rtdb.firebaseio.com/posts.json')
  //   // .pipe(map(responseData => {
  //   //   const postsArray: Post[] = [];
  //   //   for (const key in responseData) {
  //   //     if(responseData.hasOwnProperty(key)) {
  //   //       postsArray.push({ ...responseData[key], id: key});
  //   //     }
  //   //   }
  //   //   return postsArray;
  //   // }))
  //   // .subscribe(posts => {
  //   //   this.isFetching = false;
  //   //   console.log(posts);
  //   //   this.loadedPosts = posts;
  //   // });
  // }
}
