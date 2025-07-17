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
        // Inicializa o editor de texto Quill no campo principal
        const mainEditor = document.querySelector('.quill-editor-container');
        if (mainEditor) {
            this.initQuillEditor(mainEditor);
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
     * Lida com a adição de uma nova linha na tabela com os dados preenchidos.
     */
    addChild: function() {
        // Pega os valores dos campos
        var tipo = $('#tipoChangelog').val();
        var titulo = $('#titulo').val();
        var descricao = '';
        if (this.mainQuill) {
            descricao = this.mainQuill.root.innerHTML;
        } else {
            descricao = $('#descricao').val();
        }
        // Para o upload, pega o nome do arquivo selecionado
        var imagem = '-';
        var uploadInput = $("#imagemAlteracao")[0];
        if (uploadInput && uploadInput.files && uploadInput.files.length > 0) {
            imagem = uploadInput.files[0].name;
        }

        // Adiciona a nova linha na tabela
        var $tbody = $("table[tablename='tableChanges'] tbody");
        var newRow = '<tr>' +
            '<td>' + (tipo ? tipo : '-') + '</td>' +
            '<td>' + (titulo ? titulo : '-') + '</td>' +
            '<td>' + descricao + '</td>' +
            '<td>' + imagem + '</td>' +
            '<td><button type="button" class="btn btn-danger btn-xs btn-remove"><i class="fluigicon fluigicon-trash"></i></button></td>' +
            '</tr>';
        $tbody.append(newRow);

        // Limpa os campos para novo preenchimento
        $('#tipoChangelog').val('');
        $('#titulo').val('');
        if (this.mainQuill) {
            this.mainQuill.setContents([]); // Limpa o editor Quill
        } else {
            $('#descricao').val('');
        }
        if (uploadInput) {
            uploadInput.value = '';
        }
    },

    /**
     * Inicializa uma instância do editor de texto Quill em um elemento específico.
     * @param {HTMLElement} element O elemento <div> onde o editor será renderizado.
     */
    initQuillEditor: function(element) {
        if (element && !element.quill) {
            var quill = new Quill(element, {
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
            this.mainQuill = quill;
            // Atualiza o valor do input oculto sempre que o texto do editor mudar
            var hiddenInput = $(element).parent().find('.quill-hidden-input');
            if (hiddenInput.length > 0) {
                quill.on('text-change', function() {
                    hiddenInput.val(quill.root.innerHTML);
                });
            }
        }
    }
};

/**
 * Função de exclusão customizada.
 * Agora remove a linha da tabela ao clicar no botão de remover.
 */
$(document).on('click', '.btn-remove', function() {
    var $tr = $(this).closest('tr');
    FLUIGC.message.confirm({
        message: 'Você tem certeza que deseja remover esta alteração?',
        title: 'Confirmar Exclusão',
        labelYes: 'Sim, remover',
        labelNo: 'Cancelar'
    }, function(result, data) {
        if (result) {
            $tr.remove();
        }
    });
});

// Inicia o script quando o documento HTML estiver totalmente carregado
$(function() {
    Changelog.init();
});