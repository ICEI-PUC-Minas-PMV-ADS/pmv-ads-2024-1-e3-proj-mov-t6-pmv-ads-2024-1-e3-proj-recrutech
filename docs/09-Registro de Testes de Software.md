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
- A ferramenta de pesquisa de usuários não estava retornando os dados corretamente;
- A biblioteca utilizada não estava exibindo adequadamente as mensagens de erro;
- Algumas telas não estavam estilizadas conforme o padrão estabelecido de identidade visual;
- As funcionalidades relacionadas à visualização de candidaturas, notificações para usuário candidato, criação de vagas, edição de vagas cadastradas e seleção de candidatos estão em fase de desenvolvimento.

Os resultados obtidos nos testes de software realizados são descritos abaixo já devidamente corrigidos.

### CT 001 - Cadastro de Usuário Candidato
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/79f8e4a9-7fd3-45e8-8b29-9f6863825cff)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/e6682ce6-13d5-456f-be1f-25beab998f31)




### CT-002 Login de Usuário Candidato
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/793eaf54-df06-43d6-92a2-124ea1110233)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/27a262b1-8a53-4b43-91e0-b179bce790ec)



### CT-003 Edição de Perfil do Usuário Candidato
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/f014c45a-a029-461a-a7c3-16710c0ce188)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/36e31d66-cabb-4126-99a6-0921fc778049)




### CT-004 Filtro de Busca para Usuário Candidato
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/b955eb2f-af2f-4097-9df3-81900fe4ed0c)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/f6b9d53b-8ba2-40db-a19a-00996dcbc1d6)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/db86bff8-764d-43f0-92b7-8dd62ea94086)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/9aaeacc6-4c40-4e6a-9ba9-f12f49ac2159)


### CT-005 Candidatura
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/eae1fbd1-7c3a-4d80-a032-f461e7cf3fbc)


### CT-006 Visualização de Candidaturas
Funcionalidade em desenvolvimento.

### CT-007 Notificações para Usuário Candidato
Funcionalidade em desenvolvimento.

### CT-008 Cadastro de Usuário Recrutador
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/471a86e2-433f-46cd-bc93-542cafc5b12b)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/40575072-036c-4fac-b777-a5a272f20796)


### CT-009 Login de Usuário Recrutador
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/7d5efa8e-8cf7-47c6-9c95-87bebe95c807)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/c960a3ca-84bd-4e38-8bf1-fda3a9c7a9fa)



### CT-010 Edição de Perfil de Usuário Recrutador

### CT-011 Cadastro de Vagas
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/98d46909-6d44-4b97-aad7-dc353f9e64da)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/5841cf4e-b368-4d72-a7bc-099c29eb2767)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/28ba2ad0-5dcf-43e2-a685-65ad96cfe3e5)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/4a5415f3-f271-4b4c-819e-d932cca42d2c)

### CT-012 Edição de Vagas Cadastradas
Funcionalidade em desenvolvimento.

### CT-013 Visualização de Vagas pelo Usuário Recrutador
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/f6f536ce-35a3-4c83-8ecb-d5d8cda5c674)


### CT-014 Seleção de Candidatos
Funcionalidade em desenvolvimento.

### CT-015 Finalização de Vaga
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/fe85e9f7-63b3-46f6-a43e-ae36a9b4e0ee)
