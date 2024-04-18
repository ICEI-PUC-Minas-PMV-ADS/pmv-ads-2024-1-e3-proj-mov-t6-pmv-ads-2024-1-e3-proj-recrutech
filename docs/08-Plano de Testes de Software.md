# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

| Caso de Teste                                                                                      | CT-001 Cadastro de Usuário Candidato |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-001|  
| Objetivo do teste                                                                                 | Verificar se o usuário candidato consegue se cadastrar na aplicação corretamente. |
| Passos                                                                                             | 1. Acessar a página de cadastro. <br> 2. Preencher todos os campos obrigatórios (nome, e-mail, senha, data de nascimento, habilidades, experiência, currículo, localização, área de atuação e foto de perfil). <br> 3. Clicar no botão de cadastro. |
| Critérios de Êxito                                                                                | - O usuário é redirecionado para a página inicial após o cadastro. <br> - Os dados fornecidos pelo usuário são armazenados corretamente no banco de dados. <br> - Caso haja falha em algum campo obrigatório, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-002 Login de Usuário Candidato |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-002|  
| Objetivo do teste                                                                                 | Verificar se o usuário candidato consegue fazer login na aplicação utilizando seu e-mail e senha cadastrados. |
| Passos                                                                                             | 1. Acessar a página de login. <br> 2. Preencher os campos de e-mail e senha com informações válidas. <br> 3. Clicar no botão de login. |
| Critérios de Êxito                                                                                | - O usuário é redirecionado para a página inicial após o login bem-sucedido. <br> - Caso o e-mail ou senha estejam incorretos, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-003 Edição de Perfil do Usuário Candidato |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-003|  
| Objetivo do teste                                                                                 | Verificar se o usuário candidato consegue editar seu perfil corretamente. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário candidato. <br> 2. Acessar a página de edição de perfil. <br> 3. Editar as informações desejadas (habilidades, experiência, currículo e foto de perfil).<br> 4. Salvar as alterações. |
| Critérios de Êxito                                                                                | - As informações do perfil são atualizadas corretamente no banco de dados. <br> - Caso haja falha na edição, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-004 Filtro de Busca para Usuário Candidato |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-004|  
| Objetivo do teste                                                                                 | Verificar se o usuário candidato consegue buscar vagas de emprego utilizando critérios específicos. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário candidato. <br> 2. Acessar a página de busca de vagas. <br> 3. Preencher os critérios de busca (linguagem de programação, nível de experiência, remuneração e localização). <br> 4. Clicar no botão de busca. |
| Critérios de Êxito                                                                                | - O sistema exibe uma lista de vagas que correspondem aos critérios de busca. <br> - Caso não haja vagas que correspondam aos critérios, o sistema exibe uma mensagem informativa. |

| Caso de Teste                                                                                      | CT-005 Candidatura |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-005|  
| Objetivo do teste                                                                                 | Verificar se o usuário candidato consegue se candidatar a uma vaga de emprego disponível. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário candidato. <br> 2. Navegar até a página da vaga desejada. <br> 3. Clicar no botão de candidatura. |
| Critérios de Êxito                                                                                | - O sistema registra a candidatura do usuário candidato para a vaga selecionada. <br> - Caso o usuário já tenha se candidatado anteriormente para a mesma vaga, o sistema exibe uma mensagem informativa. |

| Caso de Teste                                                                                      | CT-006 Visualização de Candidaturas  |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-006|  
| Objetivo do teste                                                                                 | Verificar se o usuário candidato consegue visualizar suas candidaturas anteriores. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário candidato. <br> 2. Acessar a página de histórico de candidaturas. |
| Critérios de Êxito                                                                                | - O sistema exibe uma lista das candidaturas anteriores do usuário candidato. <br> - Caso o usuário não tenha realizado nenhuma candidatura anteriormente, o sistema exibe uma mensagem informativa. |

| Caso de Teste                                                                                      | CT-007 Notificações para Usuário Candidato |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-007|  
| Objetivo do teste                                                                                 | Verificar se o sistema de notificações informa o usuário candidato sobre novas vagas e atualizações no processo seletivo. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário candidato. <br> 2. Verificar se há notificações visíveis ou mensagens no sistema. |
| Critérios de Êxito                                                                                | - O sistema exibe notificações relevantes para o usuário candidato, como novas vagas correspondentes ao seu perfil e atualizações nas vagas em que se candidatou.<br> - Caso não haja notificações, o sistema exibe uma mensagem informativa indicando que não há novas informações no momento. |

| Caso de Teste                                                                                      | CT-008 Cadastro de Usuário Recrutador |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-008|  
| Objetivo do teste                                                                                 | Verificar se o usuário recrutador consegue se cadastrar na aplicação corretamente. |
| Passos                                                                                             | 1. Acessar a página de cadastro de recrutador.<br> 2. Preencher todos os campos obrigatórios (nome, e-mail, senha, empresa e área de atuação). <br> 3. Clicar no botão de cadastro. |
| Critérios de Êxito                                                                                | - O usuário é redirecionado para a página inicial após o cadastro.<br> - Os dados fornecidos pelo usuário são armazenados corretamente no banco de dados. <br>- Caso haja falha em algum campo obrigatório, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-009 Login de Usuário Recrutador |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-009|  
| Objetivo do teste                                                                                 | Verificar se o usuário recrutador consegue fazer login na aplicação utilizando seu e-mail e senha cadastrados. |
| Passos                                                                                             | 1. Acessar a página de login de recrutador. <br> 2. Preencher os campos de e-mail e senha com informações válidas. <br> 3. Clicar no botão de login. |
| Critérios de Êxito                                                                                | - O usuário é redirecionado para a página inicial após o login bem-sucedido. <br> - Caso o e-mail ou senha estejam incorretos, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-010 Edição de Perfil de Usuário Recrutador |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-010|  
| Objetivo do teste                                                                                 | Verificar se o usuário recrutador consegue editar seu perfil corretamente. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário recrutador. <br> 2. Acessar a página de edição de perfil. <br> 3. Editar as informações desejadas (nome da empresa, área de atuação, etc.). <br> 4. Salvar as alterações. |
| Critérios de Êxito                                                                                | - As informações do perfil são atualizadas corretamente no banco de dados. <br> - Caso haja falha na edição, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-011 Cadastro de Vagas |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-011|  
| Objetivo do teste                                                                                 | Verificar se o usuário recrutador consegue cadastrar uma nova vaga de emprego na plataforma. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário recrutador. <br> 2. Acessar a página de cadastro de vagas. <br> 3. Preencher todos os campos obrigatórios (título, descrição, requisitos, responsabilidades, benefícios, data de publicação, data de expiração, salário, tipo de contrato, área de atuação, localização, empresa e status da vaga). <br> 4. Clicar no botão de cadastro. |
| Critérios de Êxito                                                                                | - O sistema registra a nova vaga corretamente no banco de dados. <br> - Caso haja falha no cadastro, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-012 Edição de Vagas Cadastradas |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-012|  
| Objetivo do teste                                                                                 | Verificar se o usuário recrutador consegue editar as informações de uma vaga já cadastrada. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário recrutador. <br> 2. Acessar a página de visualização de vagas cadastradas. <br> 3. Selecionar a vaga desejada para edição. <br> 4. Editar as informações desejadas. <br> 5. Salvar as alterações. |
| Critérios de Êxito                                                                                | - As informações da vaga são atualizadas corretamente no banco de dados. <br> - Caso haja falha na edição, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-013 Visualização de Vagas pelo Usuário Recrutador |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-013|  
| Objetivo do teste                                                                                 | Verificar se o usuário recrutador consegue visualizar as vagas cadastradas por ele. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário recrutador. <br> 2. Acessar a página de visualização de vagas cadastradas. |
| Critérios de Êxito                                                                                | - O sistema exibe uma lista das vagas cadastradas pelo usuário recrutador. <br> - Caso o usuário não tenha cadastrado nenhuma vaga, o sistema exibe uma mensagem informativa. |

| Caso de Teste                                                                                      | CT-014 Seleção de Candidatos |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-014|  
| Objetivo do teste                                                                                 | Verificar se o usuário recrutador consegue selecionar candidatos para as vagas cadastradas e entrar em contato com eles. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário recrutador. <br> 2. Acessar a página de visualização de vagas cadastradas. <br> 3. Selecionar a vaga desejada. <br> 4. Visualizar a lista de candidatos para essa vaga. <br> 5. Selecionar os candidatos desejados. <br> 6. Utilizar a funcionalidade de contato para enviar mensagens aos candidatos selecionados. |
| Critérios de Êxito                                                                                | - O sistema registra corretamente os candidatos selecionados e as mensagens enviadas. <br> - Caso haja falha no contato com os candidatos, o sistema exibe uma mensagem de erro apropriada. |

| Caso de Teste                                                                                      | CT-015 Finalização de Vaga |  
|----------------------------------------------------------------------------------------------------|-------|
| Requisito Associado                                                                               | RF-015|  
| Objetivo do teste                                                                                 | Verificar se o usuário recrutador consegue fechar uma vaga quando a mesma for preenchida ou não estiver mais disponível. |
| Passos                                                                                             | 1. Fazer login na aplicação como usuário recrutador. <br> 2. Acessar a página de visualização de vagas cadastradas. <br> 3. Selecionar a vaga desejada. <br> 4. Utilizar a funcionalidade de fechar vaga. |
| Critérios de Êxito                                                                                | - A vaga é marcada como fechada no sistema e não está mais visível para os candidatos. <br> - Caso haja falha no fechamento da vaga, o sistema exibe uma mensagem de erro apropriada. |









 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
