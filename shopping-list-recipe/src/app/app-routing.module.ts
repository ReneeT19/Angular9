import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //only redirect when the full path is empty
    // { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
    //     { path: '', component: RecipeStartComponent },
    //     { path: 'new', component: RecipeEditComponent},
    //     { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    //     { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    // ]},
    // { path: 'shopping-list', component: ShoppingListComponent},
    // { path: 'auth', component: AuthComponent }
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}