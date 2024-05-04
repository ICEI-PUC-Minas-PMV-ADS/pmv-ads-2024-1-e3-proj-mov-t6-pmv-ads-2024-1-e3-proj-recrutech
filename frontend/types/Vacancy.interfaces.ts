export enum Contract {
  INOFFICE = 1,
  REMOTE = 2,
  HIBRID = 3,
}

export enum Office {
  TRAINEE = 1,
  JUNIOR = 2,
  MID = 3,
  SENIOR = 4,
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

    export interface Create extends Common {
      link: string;
      name: string;
      cargo: number;
      content: string;
      location: string;
      contract: number;
      enterprise: string;
      benefits: string[];
      cvs: string[] | null;
      remuneration: number;
      requirements: string[];
    }
    export interface List extends Common {}
  }
}
