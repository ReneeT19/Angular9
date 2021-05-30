import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
private recipes: Recipe[] = [
    new Recipe(
        'Hop Pot', 
        'This is traditional Chinese food', 
        'https://news.cgtn.com/news/3d3d514d3551544d31457a6333566d54/img/d28dd1786f3e4bb598da6e577b369898/d28dd1786f3e4bb598da6e577b369898.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Potatoes', 2)
        ]),
    new Recipe(
        'Dandan Noodle', 
        'This is spicy Sichuan food', 
        'https://i1.wp.com/eatup.kitchen/wp-content/uploads/2017/06/DSCF2620.jpg',
        [
            new Ingredient('Meat', 2),
            new Ingredient('Vegetables', 5)
        ]),
    new Recipe(
        'Fish blended with bok choy', 
        'This is what made Soren vomit', 
        'https://www.deegourmetgoddess.com/wp/wp-content/uploads/2017/10/1-steamed-ginger-shallot-fish-67005-1-640x400.jpg',
        [
            new Ingredient('Fish', 1),
            new Ingredient('Bok choy', 7)
        ])
    ];

constructor(private slService: ShoppingListService) {}

getRecipes() {
    return this.recipes.slice();
}

addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
}
}