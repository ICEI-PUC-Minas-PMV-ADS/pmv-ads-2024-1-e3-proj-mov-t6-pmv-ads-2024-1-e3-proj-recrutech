export enum Contract {
  Presencial = 1,
  Remoto = 2,
  Híbrido = 3,
}

export enum Office {
  Trainee = 1,
  Júnior = 2,
  Pleno = 3,
  Sênior = 4,
}

export namespace VacancyInterfaces {
  export namespace Send {
    export interface Create {
      name: string;
      link: string;
      cargo: Office;
      userId: string;
      location: string;
      content: string;
      contract: Contract;
      enterprise: string;
      remuneration: string;
      benefits: string[];
      requirements: string[];
    }
  }

  export namespace Receive {
    export interface Common {
      id: string;
      name: string;
      link: string;
      cargo: Office;
      userId: string;
      contract: Contract;
      location: string;
      content: string;
      remuneration: number;
      enterprise: string;
      benefits: string[];
      requirements: string[];
    }

    export interface Create extends Common {}
    export interface List extends Common {}
  }
}
