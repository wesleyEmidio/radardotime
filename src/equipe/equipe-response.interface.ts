export interface InterfaceEquipe {
  clubes: {
    [key: string]: {
      id: number;
      nome: string;
      abreviacao: string;
      slug: string;
      apelido: string;
      nome_fantasia: string;
      url_editoria: string;
      escudos: {
        '60x60': string;
        '45x45': string;
        '30x30': string;
      };
    };
  };
}
