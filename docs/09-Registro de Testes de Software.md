# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Com base no Plano de Testes de Software pré-estabelecido pela equipe, os registros dos casos de teste são apontados a seguir. Nesse primeiro momento, apenas o caso de teste de login foi apresentado por se tratar da fase inicial do projeto.

## Avaliação

### CT 001 - Login de usuário

Nesse caso de teste foi diagnosticado situação de falha esperada quando o usuário não insere corretamente os dados solicitados - endereço de e-mail e/ou senha. Ao inserir corretamente as credenciais, o usuário é autenticado porém não é redirecionado uma vez que as demais páginas da aplicação estão em fase de construção.

<div style="text-align:center">
    
![Usuário autenticado](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/00cc5490-0af9-4227-b200-5b80853aacf2)

Figura 1 - Usuário autenticado

![Falha de login devido à inserção de credenciais inválidas.](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/1fb28232-f00a-43f4-a5e2-b1cded036153)

Figura 2 - Falha de login devido à inserção de credenciais inválidas.

</div>

### Observação: Atualizado dia 25/05/2024.

Durante a execução dos testes, foram registrados os seguintes problemas:
- A ferramenta de pesquisa de cusuários não estava retornando os dados corretamente;
- A biblioteca utilizada não estava exibindo adequadamente as mensagens de erro;
- Algumas telas não estavam estilizadas conforme o padrão estabelecido de identidade visual.

Os resultados obtidos nos testes de software realizados são descritos abaixo já devidamente corrigidos.

### CT 001 - Cadastro de Usuário Candidato

### CT-002 Login de Usuário Candidato

### CT-003 Edição de Perfil do Usuário Candidato

### CT-004 Filtro de Busca para Usuário Candidato

### CT-005 Candidatura

### CT-006 Visualização de Candidaturas

### CT-007 Notificações para Usuário Candidato

### CT-008 Cadastro de Usuário Recrutador

### CT-009 Login de Usuário Recrutador

### CT-010 Edição de Perfil de Usuário Recrutador

### CT-011 Cadastro de Vagas

### CT-012 Edição de Vagas Cadastradas

### CT-013 Visualização de Vagas pelo Usuário Recrutador

### CT-014 Seleção de Candidatos

### CT-015 Finalização de Vaga
