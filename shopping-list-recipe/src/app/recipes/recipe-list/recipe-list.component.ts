import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  // recipes: Recipe[] = [
  //   new Recipe('Hop Pot', 'This is traditional Chinese food', 'https://news.cgtn.com/news/3d3d514d3551544d31457a6333566d54/img/d28dd1786f3e4bb598da6e577b369898/d28dd1786f3e4bb598da6e577b369898.jpg'),
  //   new Recipe('Dandan Noodle', 'This is spicy Sichuan food', 'https://i1.wp.com/eatup.kitchen/wp-content/uploads/2017/06/DSCF2620.jpg'),
  //   new Recipe('Fish blended with bok choy', 'This is what made Soren vomit', 'https://www.deegourmetgoddess.com/wp/wp-content/uploads/2017/10/1-steamed-ginger-shallot-fish-67005-1-640x400.jpg')
  // ];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }
}
