import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Post } from './post.model';
import {map} from 'rxjs/operators';

//you can provide it in the app.module providers as well, the below one is modern
@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        //send http requests
        const postData: Post = {title: title, content: content};
        this.http.post<{name: string}>(
            'https://ng-complete-guide-c8aa6-default-rtdb.firebaseio.com/posts.json',
            postData
          )
          .subscribe(responseData => {
            console.log(responseData);
          });
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-c8aa6-default-rtdb.firebaseio.com/posts.json')
        .pipe(map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key});
            }
          }
          return postsArray;
        }));
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-c8aa6-default-rtdb.firebaseio.com/posts.json');
    }
}