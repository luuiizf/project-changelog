// Objeto principal para organizar as funções do formulário
var Changelog = {
    /**
     * Ponto de entrada do script. É chamado quando o documento está pronto.
     */
    init: function() {
        this.setupListeners();
        this.setupView();
    },

    /**
     * Configura a visualização inicial do formulário.
     */
    setupView: function() {
        FLUIGC.calendar('#dataLancamento');
        
        // Inicializa o editor de texto Quill na primeira linha que já existe na página
        const firstEditor = document.querySelector('.quill-editor-container');
        if (firstEditor) {
            this.initQuillEditor(firstEditor);
        }
    },

    /**
     * Centraliza a criação de todos os "ouvintes" de eventos (cliques, mudanças, etc).
     */
    setupListeners: function() {
        // Evento de clique para o botão "Adicionar Alteração"
        $('#addChangeBtn').on('click', function() {
            Changelog.addChild();
        });
    },

    /**
     * Lida com a adição de uma nova linha na tabela Pai-Filho.
     */
    addChild: function() {
        // Adiciona uma nova linha e retorna o índice dela
        const newIndex = wdkAddChild('tableChanges');
        
        // Encontra o elemento do editor Quill na nova linha (que é a última da tabela)
        const newEditorElement = $('table[tablename="tableChanges"] tbody tr:last .quill-editor-container')[0];

        // Limpa o conteúdo clonado antes de inicializar um novo editor
        if (newEditorElement) {
            $(newEditorElement).empty();
            this.initQuillEditor(newEditorElement);
        }
    },

    /**
     * Inicializa uma instância do editor de texto Quill em um elemento específico.
     * @param {HTMLElement} element O elemento <div> onde o editor será renderizado.
     */
    initQuillEditor: function(element) {
        if (element && !element.quill) {
            const quill = new Quill(element, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['link']
                    ]
                },
                placeholder: 'Descreva a alteração detalhadamente...'
            });

            // Encontra o input oculto correspondente para salvar o HTML do editor
            const hiddenInput = $(element).parent().find('.quill-hidden-input');
            if (hiddenInput.length > 0) {
                // Atualiza o valor do input oculto sempre que o texto do editor mudar
                quill.on('text-change', function() {
                    hiddenInput.val(quill.root.innerHTML);
                });
            }
        }
    }
};

/**
 * Função de exclusão customizada.
 * Precisa ficar no escopo global (window) para ser acessível pelo 'onclick' do HTML gerado pelo Fluig.
 * @param {HTMLElement} oElement O ícone de lixeira que foi clicado.
 */
function myCustomDelete(oElement) {
    FLUIGC.message.confirm({
        message: 'Você tem certeza que deseja remover esta alteração?',
        title: 'Confirmar Exclusão',
        labelYes: 'Sim, remover',
        labelNo: 'Cancelar'
    }, function(result, data) {
        if (result) {
            // Remove a linha do formulário
            fnWdkRemoveChild(oElement);
        }
    });
}


// Inicia o script quando o documento HTML estiver totalmente carregado
$(function() {
    Changelog.init();
});