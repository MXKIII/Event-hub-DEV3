import { Category } from "./value-object/category.js";

export class CategorySet {
    private categories: Category[] = [];

    constructor(categories: Category[]) {
        this.categories = this.removeDuplicates(categories);
    }

    private removeDuplicates(categories: Category[]){
        const uniqueCategories: Category[] = [];

        for (const category of categories){
            if (!uniqueCategories.some(s => s.equals(category))){
                uniqueCategories.push(category);
            }
        }

        return uniqueCategories;
    }

    hasAtLeast(n: number): boolean {
        return this.categories.length >= n;
    }

    getValidated(): Category[] {
        return this.categories.filter(s => s.isValidated());
    }

    hasRequiredCategory(required: string[], ratio: number): boolean {
        const validatedNames = this.getValidated().map(s => s.getName().toLowerCase());
        const matches = required.filter(req => validatedNames.includes(req.toLowerCase()));

        return matches.length / required.length >= ratio;
    }
}