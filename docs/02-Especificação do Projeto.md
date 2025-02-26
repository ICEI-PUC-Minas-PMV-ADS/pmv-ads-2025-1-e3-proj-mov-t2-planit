# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

##Persona 1: 

Juliana Andrade – Esteticista Autônoma, tem 32 anos, possui experiência de 8 anos no setor de estética,
enfrenta dificuldades para organizar sua agenda e evitar sobreposições de horários.
Lida com clientes que frequentemente desmarcam de última hora. Precisa de um sistema que ajude a lembrar os clientes dos compromissos. 
Necessita que o sistema tenha agendamento automatizado e lembretes para clientes, facilidade na personalização de horários e serviços e integração com redes sociais para captar novos clientes.

##Persona 2:

Ricardo Mendes – Fisioterapeuta em Clínica Particular, tem 40 anos, possui experiência de 15 anos como fisioterapeuta
Precisa gerenciar uma agenda extensa de pacientes com diferentes tratamentos. Perde tempo reorganizando horários quando pacientes faltam sem aviso.
Quer evitar conflitos de agendamento entre ele e outros profissionais da clínica. Necessita que o sistema permita visualizar e reorganizar compromissos rapidamente,
integração com outras agendas digitais usadas pela clínica e opção de permitir que os próprios clientes remarquem horários dentro de regras pré-definidas.

##Persona 3:

Vanessa Souza – Professora Particular de Inglês, tem 27 anos, possui experiência de 5 anos dando aulas particulares online e presenciais
Precisa equilibrar horários de diferentes alunos sem causar sobreposição. Quer oferecer mais flexibilidade para remarcações sem prejudicar sua organização.
Busca um meio de facilitar pagamentos sem depender de transferências bancárias. Necessita de um sistema que ofereça controle de horários e cancelamentos automáticos,
funcionalidade de pagamento integrado para evitar atrasos e uma interface intuitiva para fácil uso pelos alunos.




## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO              | QUERO/PRECISO                     |PARA                                    |
|--------------------|------------------------------------|----------------------------------------|
|Juliana Andrade     | Permitir que clientes agendem horários online | Reduzir o tempo gasto com marcações manuais |
|Juliana Andrade     | Integrar minha agenda com redes sociais  | acilitar o agendamento direto pelos clientes |
|Ricardo Mendes      | Oferecer um lembrete automático para consultas | Diminuir faltas dos pacientes|
|Ricardo Mendes      | Permitir reagendamentos dentro de regras pré-definidas | Evitar buracos na minha agenda|
|Vanessa Souza       | Oferecer opção de pagamento recorrente para alunos| Reduzir atrasos e esquecimentos de pagamento|
|Vanessa Souza       | Criar um sistema de lembretes automáticos para aulas| Melhorar a assiduidade dos alunos|

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| A aplicação deve permitir criar uma conta | ALTA | 
|RF-002| A aplicação deve permitir a exclusão da conta  | MÉDIA |
|RF-003| A aplicação deve permitir editar o perfil do usuário | MÉDIA | 
|RF-004| A aplicação deve permitir integração com outras agendas digitais | ALTA |
|RF-005| A aplicação deve permitir consultar históricos de agendamentos  | ALTA |
|RF-006| A aplicação deve permitir que o usuário gerencie horários disponíveis  | ALTA |
|RF-007| A aplicação deve permitir gerar um relatório financeiro  | ALTA |
|RF-008| A aplicação deve permitir realizar pagamentos   | MÉDIA |
|RF-009| A aplicação deve permitir um sistema de notificações quando houver conflitos com outras  agendas digitais   | ALTA |
|RF-010| A aplicação deve permitir um sistema de notificações de compromissos agendados  | ALTA |
|RF-011| A aplicação deve permitir que profissionais registre informações dos clientes   | ALTA |
|RF-012| A aplicação deve permitir editar e excluir informações dos clientes   | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| A aplicação deve ter a opção de fazer o login com Google. |  BAIXA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
