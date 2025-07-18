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
        const inputFile = $('#imagemAlteracao')[0];

        if (!tipo || !titulo || !descricao || !inputFile || !inputFile.files.length) {
            FLUIGC.toast({ title: 'Atenção: ', message: 'Preencha todos os campos e selecione uma imagem.', type: 'warning' });
            return;
        }

        const file = inputFile.files[0];
        const fileName = file.name;
        const idPasta = 158963; // ID da pasta onde a imagem será salva

        const docId = await this.salvarImagem(file, fileName, idPasta);
        if (!docId) {
            FLUIGC.toast({ title: 'Erro: ', message: 'Não foi possível salvar a imagem.', type: 'danger' });
            return;
        }

        // Adiciona linha na tabela dinâmica
        const linha = wdkAddChild(this.tabelaFilha);

        $(`#tipoFilho___${linha}`).val(tipo);
        $(`#tituloFilho___${linha}`).val(titulo);
        $(`#descricaoFilho___${linha}`).val(descricao);
        $(`#imagemFilho___${linha}`).val(fileName);

        this.limparCampos();
    },

    limparCampos() {
        $('#tipoChangelog').val('');
        $('#titulo').val('');
        if (this.mainQuill) this.mainQuill.setContents([]);
        $('#imagemAlteracao').val('');
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

    async salvarImagem(file, fileName, folderId) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pathId', folderId);
        formData.append('nameFile', fileName);

        try {
            const baseUrl = 'https://fluighml.rn.sebrae.com.br';
            const url = `${baseUrl}/fluighub/rest/service/execute/uploadfile`;

            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            const res = await response.json();
            if (res.code !== 200) {
                throw new Error('Erro ao enviar o arquivo');
            }

            return JSON.parse(res.message).documentId;
        } catch (err) {
            console.error('Erro no upload:', err);
            return false;
        }
    }
};
