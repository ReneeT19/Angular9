import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    // this.fetchPosts();
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
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
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      // console.log(error);
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

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
