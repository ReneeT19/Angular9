//blueprint for the recipe object we create using vanila TS
//define how a recipe should look like
export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
//instantiate with new keyword and pass the args to the constructor
//executed once creating a new instance of the class
    constructor(name:string, desc: string, imagePath: string){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}