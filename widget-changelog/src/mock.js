// src/mock.js

// A estrutura imita a resposta da API de Datasets do Fluig
export const mockChangelogData = {
  columns: ["versionNumber", "releaseDate", "changeType", "changeTitle", "changeDescription", "changeImageId"],
  values: [
    {
      "versionNumber": "2.1.0",
      "releaseDate": "2025-07-15",
      "changeType": "Nova Funcionalidade",
      "changeTitle": "Integração com Quill.js",
      "changeDescription": "Substituímos o editor de texto padrão pelo Quill.js para uma melhor experiência.",
      "changeImageId": "158990" // ID de uma imagem de teste no ECM
    },
    {
      "versionNumber": "2.1.0",
      "releaseDate": "2025-07-15",
      "changeType": "Melhoria",
      "changeTitle": "Performance na Tabela Pai x Filho",
      "changeDescription": "Otimizamos o script de inicialização dos componentes na tabela.",
      "changeImageId": ""
    },
    {
      "versionNumber": "2.0.0",
      "releaseDate": "2025-06-28",
      "changeType": "Correção de Bug",
      "changeTitle": "Erro na Função de Deleção",
      "changeDescription": "Corrigido bug que impedia a função customizada de deleção de ser chamada.",
      "changeImageId": ""
    },
    {
      "versionNumber": "1.0.0",
      "releaseDate": "2025-06-28",
      "changeType": "Nova Funcionalidade",
      "changeTitle": "Adição de Nova Tabela",
      "changeDescription": "Adicionamos uma nova tabela para exibir os dados de forma mais organizada.",
      "changeImageId": ""
    },
    {
      "versionNumber": "3.0.0",
      "releaseDate": "2025-06-28",
      "changeType": "Correção de Bug",
      "changeTitle": "Correção de Erro na Tabela Pai x Filho",
      "changeDescription": "Corrigido erro que impedia a tabela pai x filho de ser exibida corretamente.",
      "changeImageId": ""
    }
  ]
};
