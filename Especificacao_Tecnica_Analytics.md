# Especificação Técnica e Desenho de Solução: Data Analytics e Prevenção

## 1. Visão Geral do Sistema
Este documento define a arquitetura técnica, o fluxo de dados e os requisitos sistêmicos para a plataforma de Monitoramento e Prevenção de Falhas. O sistema será responsável por extrair, processar e visualizar dados operacionais, evoluindo para a identificação de correlações e geração de alertas preditivos.

## 2. Arquitetura de Dados (Data Flow)
Descreva como o dado sai da origem até chegar no painel final.
* **Origem dos Dados (Data Sources):** [Quais são os bancos de dados? PostgreSQL, MySQL, APIs, arquivos CSV?]
* **Processamento (ETL/ELT):** [Como os dados serão extraídos e limpos? Ex: Python, Apache Airflow, dbt, scripts agendados no Cron]
* **Armazenamento (Data Warehouse/Data Lake):** [Onde os dados processados ficarão salvos? Ex: Banco de dados dedicado, BigQuery, AWS Redshift, ou views materializadas no banco atual]
* **Visualização (BI / Frontend):** [Qual ferramenta será usada para exibir os gráficos e o mapa de calor? Ex: Metabase, PowerBI, Tableau, Grafana, ou um Dashboard customizado em React/ECharts]

## 3. Requisitos Funcionais (O que o sistema faz)
1. **RF01 - Mapa de Calor:** O sistema deve gerar uma matriz (heatmap) diária cruzando os itens operacionais com o volume de falhas ou piora de performance na semana.
2. **RF02 - Filtragem Dinâmica:** O sistema deve permitir a filtragem dos dados por [definir filtros: segmento, equipe, região].
3. **RF03 - Cálculo Customizado (KPI Core):** O sistema deve cruzar a base A com a base confidencial B para calcular o indicador X de forma agregada (sem expor os dados brutos de B).
4. **RF04 - Exportação de Histórico:** O sistema deve permitir a exportação em formato tabular (CSV/Excel) do histórico de incidentes dos itens críticos.

## 4. Requisitos Não Funcionais (Como o sistema faz)
1. **RNF01 - Atualização (Frequência):** Os dados do dashboard devem ser atualizados a cada [X horas / D-1 (dia anterior) / em tempo real].
2. **RNF02 - Desempenho:** As consultas do dashboard (queries) não devem impactar a performance do banco de dados de produção (necessário banco de leitura/réplica).
3. **RNF03 - Segurança e Acesso:** O acesso ao dashboard e, principalmente, à métrica calculada restrita, deve ser limitado apenas a gerentes e diretores autorizados (Role-Based Access Control).

## 5. Dicionário de Dados e Regras de Negócio
Definição técnica de como as métricas são calculadas.
* **Item Crítico (Definição):** Item que apresentou falha > X% nos últimos Y dias.
* **Fórmula do KPI Core:** `(Soma da Base A / Peso da Base Confidencial B) * 100`

## 6. Evolução Técnica (Fases 2 e 3)
* **Requisitos para Correlação (Fase 2):** Será necessário implementar rotinas (ex: jobs Python) que rodem análises estatísticas (ex: Coeficiente de Pearson, Regras de Associação) sobre a base histórica para identificar pares de falhas frequentes.
* **Requisitos para Predição (Fase 3):** Exigirá a coleta de features históricas para treinamento de um modelo de Machine Learning (ex: Random Forest, XGBoost) que retornará uma pontuação de risco (Risk Score) diária para cada item.
