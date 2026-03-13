export class Category {
    private readonly name: string;
    private readonly validated: boolean;

    constructor(name: string, validated: boolean) {
        if(!name){
            throw new Error("Category name is required");
        }
        this.name = name.trim();
        this.validated = validated;
    }

    isValidated(){
        return this.validated;
    }

    getName(){
        return this.name;
    }

    equals(other: Category){
        return this.name.toLowerCase() === other.getName().toLowerCase();
    }
}