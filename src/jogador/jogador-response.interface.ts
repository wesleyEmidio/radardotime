export interface InterfaceJogador {
  atletas: {
    [key: string]: {
      atleta_id: number;
      nome: string;
      slug: string;
      apelido: string;
      apelido_abreviado: string;
      foto: string;
      clube_id: number;
      posicao_id: number;
    };
  };
}
