$(document).ready(function () {
    Changelog.init();
});

const Changelog = {
    tabelaFilha: "tableChanges",
    mainQuill: null,

    init() {
        this.setupView();
        this.setupListeners();
    },

    setupView() {
        // Inicializa o calendário Fluig
        FLUIGC.calendar('#dataLancamento');

        // Inicializa o Quill
        const editorContainer = document.querySelector('.quill-editor-container');
        if (editorContainer) {
            this.initQuillEditor(editorContainer);
        }
    },

    setupListeners() {
        $('#addChangeBtn').on('click', () => this.adicionarLinha());

        $(document).on('click', '.btn-remove', function () {
            const $linha = $(this).closest('tr');
            FLUIGC.message.confirm({
                message: 'Você tem certeza que deseja remover esta alteração?',
                title: 'Confirmar Exclusão',
                labelYes: 'Sim, remover',
                labelNo: 'Cancelar'
            }, function (confirmado) {
                if (confirmado) fnWdkRemoveChild($linha);
            });
        });
    },

    async adicionarLinha() {
        const tipo = $('#tipoChangelog').val();
        const titulo = $('#titulo').val();
        const descricao = this.mainQuill ? this.mainQuill.root.innerHTML : '';
        const inputFile = $('#imagemAnexo').val();

        // Adiciona linha na tabela dinâmica
        const linha = wdkAddChild(this.tabelaFilha);

        $(`#tipoFilho___${linha}`).val(tipo);
        $(`#tituloFilho___${linha}`).val(titulo);
        $(`#descricaoFilho___${linha}`).val(descricao);
        $(`#imagemFilho___${linha}`).val(inputFile);

        this.limparCampos();
    },

    limparCampos() {
        $('#tipoChangelog').val('');
        $('#titulo').val('');
        if (this.mainQuill) this.mainQuill.setContents([]);
        $('#imagemAnexo').val('');
        
    },

    initQuillEditor(container) {
        const quill = new Quill(container, {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ align: [] }],
                    ['link']
                ]
            },
            placeholder: 'Descreva a alteração detalhadamente...'
        });

        this.mainQuill = quill;

        quill.on('text-change', () => {
            $('#descricao').val(quill.root.innerHTML);
        });
    },
};
