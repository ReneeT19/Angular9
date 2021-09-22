import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { AuthGuard } from "./auth/auth/auth.guard";

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
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}