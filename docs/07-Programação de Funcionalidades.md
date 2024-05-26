# Programação de Funcionalidades

A programação de funcionalidade é uma abordagem usada no desenvolvimento de software para definir e detalhar as capacidades e comportamentos que um sistema deve ter para atender às necessidades dos usuários. Essa prática envolve a criação de requisitos funcionais, que especificam o que o sistema deve fazer. Esses requisitos são fundamentais para guiar o desenvolvimento, teste e implementação de funcionalidades no software, garantindo que ele seja útil e eficaz para seus usuários.

Na prática, a programação de funcionalidade inclui a criação de artefatos específicos, como controladores, interfaces de usuário e componentes que juntos compõem a funcionalidade descrita nos requisitos. Cada artefato é responsável por uma parte do comportamento do sistema e é desenvolvido para cumprir um ou mais requisitos funcionais.

### Observação: Atualizado dia 06/04/2024.

O aplicativo foi dividido em FrontEnd utilizando React Native e BackEnd utilizando ASP .NET Core. Atualmente o desenvolvimento está em fase inicial. Estão dispovíveis mas ainda em fase de testes as seguintes telas:


#### - Estrutura atual FrontEnd:
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/117364316/b99bb443-f29c-45e1-8fd4-208d3cba29f1)

#### - Estrutura atual BackEnd:
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/117364316/cb341313-24e2-4e95-9c0c-5532f0a19f7a)

#### - Funcionalidades implementadas:

- Página inicial

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/65717646/cfc90665-bc22-43cf-9aa9-136f43cfe55e" alt="Gato fofo" width="375" height="667">
<br><br>

- Login para pessoa candidata

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/65717646/5bb7ae65-24f3-4835-babb-f38ded86d83b" alt="Gato fofo" width="375" height="667">
<br><br>

- Login para pessoa recrutadora
  
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/65717646/2b538107-2a66-4b50-99b8-08792083bcda" alt="Gato fofo" width="375" height="667">
<br><br>

- Validações para email e senha:

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/65717646/6e03aaa1-b959-4b7f-845d-5ebb97c6333c" alt="Gato fofo" width="375" height="667">

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/65717646/3196c02c-5d20-4b0e-b282-50ffd26fd8fd" alt="Gato fofo" width="375" height="667">
<br><br>

- Erro ao realizar autenticação

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/65717646/40ba524e-a2eb-40cc-9d6d-48bb3381eec3" alt="Gato fofo" width="375" height="667">
<br><br>

- Sucesso ao realizar autenticação

  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/65717646/0735666e-285e-4ca5-8b28-9243976ce7f2" alt="Gato fofo" width="375" height="667">
<br><br>

- Página inicial para usuário autenticado
  
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/65717646/9f0752f7-3a3f-495c-85df-adc7f2326674" alt="Gato fofo" width="375" height="667">

### Observação: Atualizado dia 25/05/2024.

| ID do Requisito | Descrição Resumida do Requisito            | Artefato(s) Construído(s)                                                 |
|-----------------|--------------------------------------------|---------------------------------------------------------------------------|
| RF-001          | Cadastro de usuário candidato              | UsersControllers.cs, sign-up/[userType.tsx] (developer)                   |
| RF-002          | Login de usuário candidato                 | UsersControllers.cs, sign-in/[userType.tsx] (developer)                   |
| RF-003          | Edição de perfil do candidato              | UsersControllers.cs, profile/edit.tsx                                     |
| RF-004          | Busca de vagas por candidatos              | VacanciesController.cs, home/developer/index.tsx[SearchBar.tsx]           |
| RF-005          | Candidatura a vagas                        | VacanciesController.cs, CvController.cs. home/developer/index.tsx[RecentVacancyCard.tsx] |
| RF-006          | Visualização de candidaturas anteriores     | Funcionalidade não implementada                                          |
| RF-007          | Sistema de notificações para candidatos    | Funcionalidade não implementada                                          |
| RF-008          | Cadastro de usuário recrutador             | UsersControllers.cs, sign-up/[userType.tsx] (recruiter)                   |
| RF-009          | Login de usuário recrutador                | UsersControllers.cs, sign-in/[userType.tsx] (recruiter)                   |
| RF-010          | Edição de perfil do recrutador             | UsersControllers.cs, profile/index.tsx                                    |
| RF-011          | Cadastro de vagas por recrutadores         | VacancyController.cs, home/(recruiter)/(vacancy)/create.tsx               |
| RF-012          | Edição de informações de vagas             | Funcionalidade não implementada                                          |
| RF-013          | Visualização de vagas cadastradas pelo recrutador | VacancyController.cs, home/recruiterVacancies/[id].tsx                    |
| RF-014          | Seleção e contato com candidatos           | VacancyController.cs, UsersControllers.cs, home/recruiterVacancies/[id].tsx/(developer)/[id].tsx |
| RF-015          | Fechamento de vagas                        | VacancyController.cs, home/recruiterVacancies/[id].tsx                   |

Essa tabela auxilia no rastreamento do progresso do desenvolvimento, ajudando a identificar quais requisitos foram implementados e quais ainda estão pendentes, além de associar cada funcionalidade aos seus respectivos componentes técnicos.

