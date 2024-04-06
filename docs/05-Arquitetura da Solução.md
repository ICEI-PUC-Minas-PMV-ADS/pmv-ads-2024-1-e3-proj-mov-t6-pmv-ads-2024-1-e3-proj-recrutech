# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.


![arqDaSolucao](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/126488218/c729f5dd-3a08-4b79-817e-9ce524e65ab4)



## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![Diagrama em branco (1)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/126488218/e08f5490-e386-4ccc-a6da-5e7957a14269)


## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.

![WhatsApp Image 2024-03-21 at 21 16 51](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/126488218/e30ea9dd-56eb-4cba-8894-0a33a5b054f5)

 

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Tecnologias Utilizadas
Linguagem: JavaScript, C#
Biblioteca: React Native,
IDE: Visual Studio,Visual Studio Code e Expo.dev
Ferramentas apoio Backend:  Swagger e Postgres
Ferramenta Wireframes: Figma
Ferramenta de Comunicação: Whatsapp e Teams
Ferramenta de Gestão de Projeto: Trello
![gestaoProjeto](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-recrutech/assets/126488218/9a05b1ab-d313-4619-b6a2-498119aa026b)


## Hospedagem

ElephantSQL: Utilizada para hospedagem do banco de dados PostgreSQL
Microsoft AzureDevOps: Utilizada para hospedagem/atualizações do BackEnd

## Qualidade de Software

Definir qualidade é uma missão desafiadora, mas pode ser compreendida como um conjunto de práticas gerenciais que, por meio de procedimentos disseminados em toda a organização, visa assegurar um resultado final que atenda às expectativas dos envolvidos.

No âmbito do desenvolvimento de software, qualidade pode ser interpretada como um conjunto de atributos a serem cumpridos, de modo a garantir que o produto de software atenda às demandas de seus usuários. Contudo, essa satisfação não é sempre alcançada de forma natural, necessitando de uma construção contínua. Assim, a qualidade do produto está intrinsecamente ligada ao seu processo de desenvolvimento correspondente.

A norma internacional ISO/IEC 25010, uma evolução da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software. Com base nessas características e em suas respectivas subcaracterísticas, a equipe identificou, primeiramente, as subcaracterísticas que serão adotadas como referência para orientar o desenvolvimento do projeto de software, considerando alguns aspectos fundamentais de qualidade. Abaixo, são apresentadas as subcaracterísticas selecionadas, acompanhadas de justificativa e métricas de avaliação:
| Característica | Subcaracterística | Justificativa | Métrica |
|----------------|-------------------|---------------|---------|
| Funcionalidade | Adequação         | Para avaliar se o sistema atende bem os requisitos levantados pela equipe. | O software atende os requisitos levantados? 1- Atende 2- Atende a maioria 3- Não atende. Sendo nota 0 para o "Não atende", 3 para o "Atende a maioria" e 5 para o "Atende". |
| Confiabilidade | Recuperabilidade  | A equipe considera essa subcaracterística importante, pois muitos dados podem ser perdidos após uma falha do sistema, trazendo muitos problemas aos projetos que foram iniciados. | Os dados anteriores foram recuperados? 1- Sim 2- Não. Use "Sim" se TODOS os dados foram recuperados e "Não" se pelo menos um dado está faltando. Será avaliado, em porcentagem, se o sistema obteve êxito na recuperação dos dados. |
| Usabilidade    | Apreensibilidade | A equipe optou por essa subcaracterística para poder entender melhor o quão difícil está para o usuário aprender a usar todas as funcionalidades oferecidas pelo sistema. | O sistema é de fácil entendimento? 1- Totalmente 2- Grande Parte 3- Não. Sendo nota 5 para "Totalmente", 3 para "Grande Parte" e 0 para "Não". |
| Eficiência     | Comportamento em relação ao tempo | Por ser um sistema que disponibiliza ferramentas para criação de projetos e tarefas, é extremamente importante a avaliação do tempo quando é requisitado um dado na tela. | O sistema demora quanto tempo para responder sua requisição? 1- De 0 a 3 segundos 2- De 4 a 7 segundos 3- De 7 a 10 segundos 4- mais de 10 segundos. Sendo nota 5 para "de 0 a 3 segundos", nota 3 para "de 4 a 7 segundos", nota 2 para "de 7 a 10 segundos" e nota 0 para "mais de 10 segundos". |
| Manutenibilidade | Analisabilidade   | A equipe considerou uma subcaracterística importante, pois é uma forma de verificar o quanto o código está sendo escrito com fácil compreensão e o quão fácil será para corrigir um erro. | Quanto tempo levou para analisar e corrigir um erro? 1- 15 min a 1 hora 2- 1 hora a 2 horas 3- mais de 3 horas. Sendo notas 5 para a opção 1, nota 3 para a opção 2 e nota 0 para a opção 3. |
| Segurança      | Confidencialidade | Para proteger os dados do projeto de cada equipe, foi escolhido essa subcaracterística para avaliação. | Os dados estão criptografados? 1- Sim 2- Não. A senha continua criptografada após o usuário realizar o login? 1- Sim 2- Não. |
| Portabilidade  | Adaptabilidade    | Para analisar a capacidade do aplicativo se adaptar a diferentes tamanhos de tela. | Qual o tempo médio para implementar mudanças ou atualizações exigidas na plataforma usada? 1- 15 min a 1 hora 2- 1 hora a 2 horas 3- mais de 3 horas. Sendo notas 5 para a opção 1, nota 3 para a opção 2 e nota 0 para a opção 3. |

