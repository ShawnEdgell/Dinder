// src/types.d.ts
export interface Ingredient {
	id: number;
	name: string;
	original: string;
}

export interface Recipe {
	id: number;
	title: string;
	image: string;
	summary: string;
	instructions: string;
	sourceUrl: string;
	extendedIngredients: Ingredient[];
}
