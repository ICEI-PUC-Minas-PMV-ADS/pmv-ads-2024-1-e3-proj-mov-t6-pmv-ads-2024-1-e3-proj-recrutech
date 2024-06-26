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


### CT 001 - Cadastro de Usuário Candidato
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/79f8e4a9-7fd3-45e8-8b29-9f6863825cff)


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
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/d4e97b88-803a-48f3-859c-8245f150fb70)


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

### Observação: Atualizado dia 18/06/2024.
Os resultados obtidos nos testes de software realizados são descritos abaixo já devidamente corrigidos.

### CT 001 - Cadastro de Usuário Candidato

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/9a774026-2e35-4d9d-bdcf-c6cd7d9f20d6" alt="Figura 1 - Cadastro de usuário com credenciais válidas"/>
</p>
<p align="center"><i>Figura 1 - Cadastro de usuário com credenciais válidas</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/4a2923af-dd3f-4da0-b5c3-73f6a0574dbc" alt="Figura 2 - Cadastro de usuário com credenciais válidas"/>
</p>
<p align="center"><i>Figura 2 - Cadastro de usuário com credenciais válidas</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/a4e44bcc-e283-48c1-9235-abfd1ad4c321" alt="Figura 3 - Cadastro realizado com sucesso"/>
</p>
<p align="center"><i>Figura 3 - Cadastro realizado com sucesso</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/38b90664-4045-4173-9b08-ec13609751a9" alt="Figura 4 - Mensagem de erro ao utilizar e-mail inválido"/>
</p>
<p align="center"><i>Figura 4 - Mensagem de erro ao utilizar e-mail inválido</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/8630fa48-38c1-413e-a4a5-77a6710b9c04" alt="Figura 5 - Mensagem de erro ao utilizar CEP inválido"/>
</p>
<p align="center"><i>Figura 5 - Mensagem de erro ao utilizar CEP inválido</i></p>


### CT-002 Login de Usuário Candidato

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/d3be184c-e5f4-4122-8966-ebb439256aec" alt="Figura 6 - Login de usuário candidato"/>
</p>
<p align="center"><i>Figura 6 - Login de usuário candidato</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/53d73585-04c7-41a0-a9fe-f5a7c48d8950" alt="Figura 7 - Erro ao não preencher campos obrigatórios"/>
</p>
<p align="center"><i>Figura 7 - Erro ao não preencher campos obrigatórios</i></p>


<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/b73b56f3-ad96-49eb-9782-a1a7b1e2f72d" alt="Figura 8 - Erro ao utilizar credenciais inválidas"/>
</p>
<p align="center"><i>Figura 8 - Erro ao utilizar credenciais inválidas</i></p>


### CT-003 Edição de Perfil do Usuário Candidato
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/91ead39c-83a6-4cdc-a848-ecfc38b4556b" alt="Figura 9 - Dados carregados do banco antes da edição"/>
</p>
<p align="center"><i>Figura 9 - Dados carregados do banco antes da edição</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/3da2336b-8fd7-493d-9a14-1b5911e91350" alt="Figura 10 - Edição do currículo"/>
</p>
<p align="center"><i>Figura 10 - Edição do currículo</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/6e634e14-e847-4dcf-9182-f789a7fb3abd" alt="Figura 11 - Currículo atualizado"/>
</p>
<p align="center"><i>Figura 11 - Currículo atualizado</i></p>


### CT-004 Filtro de Busca para Usuário Candidato
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/f0fcde6e-6eee-4ce4-970d-c612344c01c7" alt="Figura 12 - Filtros da aplicação"/>
</p>
<p align="center"><i>Figura 12 - Filtros da aplicação</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/b1ca7c62-72e9-4061-ba7c-c642907df58c" alt="Figura 13 - Retorno de vagas filtradas"/>
</p>
<p align="center"><i>Figura 13 - Retorno de vagas filtradas</i></p>


### CT-005 Candidatura
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/0812a49e-0307-4b3e-84e4-bca8f1210b2f" alt="Figura 14 - Visualização de vaga para usuário candidato"/>
</p>
<p align="center"><i>Figura 14 - Visualização de vaga para usuário candidato</i></p>

### CT-006 Visualização de Candidaturas
Funcionalidade não aplicada.

### CT-007 Notificações para Usuário Candidato
Funcionalidade não aplicada.

### CT-008 Cadastro de Usuário Recrutador
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/5152dbe4-bc82-4dc4-9b06-18b9cba124a2" alt="Figura 15 - Credenciais inválidas para cadastro"/>
</p>
<p align="center"><i>Figura 15 - Credenciais inválidas para cadastro</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/cd95e9ea-5f25-47ba-a669-63a50f0a6851" alt="Figura 16 - Usuário recrutador cadastrado com sucesso"/>
</p>
<p align="center"><i>Figura 16 - Usuário recrutador cadastrado com sucesso</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/4baa06db-0e65-4cec-b264-08c03cfc1154" alt="Figura 16 - Usuário recrutador cadastrado com sucesso"/>
</p>
<p align="center"><i>Figura 17 - Usuário recrutador cadastrado com sucesso</i></p>

### CT-009 Login de Usuário Recrutador
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/650eea53-7a8c-4b39-bcc7-8f29c34818e4" alt="Figura 18 - Credenciais inválidas para login"/>
</p>
<p align="center"><i>Figura 18 - Credenciais inválidas para login</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/7c89fd21-c0c0-4d8b-a6ec-e8cc76d6ee96" alt="Figura 19 - Usuário recrutador logado com sucesso"/>
</p>
<p align="center"><i>Figura 19 - Usuário recrutador logado com sucesso</i></p>

### CT-010 Edição de Perfil de Usuário Recrutador
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/a7384eb0-60bf-403b-9468-d2a0e2f2ffc0" alt="Figura 20 - Edição de perfil de usuário recrutador"/>
</p>
<p align="center"><i>Figura 20 - Edição de perfil de usuário recrutador</i></p>

### CT-011 Cadastro de Vagas
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/ed5f03d9-17ee-4cf5-90bc-1460d378892e" alt="Figura 21 - Cadastro de vagas"/>
</p>
<p align="center"><i>Figura 21 - Cadastro de vagas</i></p>

<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/75bd59a5-a6d7-443f-82b5-1d9c83165a5d" alt="Figura 22 - Cadastro de vagas"/>
</p>
<p align="center"><i>Figura 22 - Cadastro de vagas</i></p>


### CT-012 Edição de Vagas Cadastradas
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/0b6dc5d9-be1d-452b-87c8-efa9da429693" alt="Figura 23 - Edição de vaga"/>
</p>
<p align="center"><i>Figura 23 - Edição de vaga</i></p>

### CT-013 Visualização de Vagas pelo Usuário Recrutador
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/2a952d63-50bf-47b9-a3eb-3f96c81be411" alt="Figura 24 - Visualização de vaga pelo usuário recrutador"/>
</p>
<p align="center"><i>Figura 24 - Visualização de vaga pelo usuário recrutador</i></p>

### CT-014 Seleção de Candidatos
Funcionalidade não implementada.


### CT-015 Finalização de Vaga
<p align="center">
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/128100886/cb1dc276-1443-4e70-9770-77bf3043cb87" alt="Figura 25 - Finalização de vaga"/>
</p>
<p align="center"><i>Figura 25 - Finalização de vaga</i></p>







