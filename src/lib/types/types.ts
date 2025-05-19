// src/types.ts
export interface Recipe {
	id: number;
	title: string;
	image: string;
	imageType: string;
	summary?: string; // Often HTML
	instructions?: string; // Often HTML
	sourceUrl?: string;
	readyInMinutes?: number;
	servings?: number;
	extendedIngredients?: Ingredient[];
	// Add any other fields you want to use
}

export interface Ingredient {
	id: number;
	aisle: string;
	image: string;
	consistency: string;
	name: string;
	nameClean: string;
	original: string;
	originalName: string;
	amount: number;
	unit: string;
	meta: string[];
	measures: {
		us: Measure;
		metric: Measure;
	};
}

export interface Measure {
	amount: number;
	unitShort: string;
	unitLong: string;
}

export interface FavoriteRecipeInfo {
	id: number;
	title: string;
	image?: string;
	sourceUrl: string;
}
