
export interface Training {
  slug: string;

  // le catalogue renvoie parfois "title", parfois "name"
  title?: string;
  name?: string;

  // textes possibles suivant les endpoints
  shortDescription?: string;
  description?: string;
  resume?: string;

  // déjà présent
  objectives?: string;

  // tu peux ajouter d’autres champs si besoin (id, durée, etc.)
  id?: number | string;
}
