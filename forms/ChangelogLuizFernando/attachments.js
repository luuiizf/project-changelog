const inputFile = {
    buttonId: ''
}

function anexos(el) {
    let parent = $(el).parent()
    let action = $(el).attr("data-action")
    let fileDescription = parent.find(".anexo")
    let anexoId = parent.find(".anexoId")

    inputFile.buttonId = fileDescription

    if (action == "upload") {
        if (fileDescription.val()) removeFile(fileDescription.val())
        uploadFile()
        return
    }

    if (action == "delete") {
        removeFileConfirm(fileDescription.val(), fileDescription)
        return
    }

    if (action == "view") {
        viewerFile(fileDescription.val())
        return
    }

    if (action == "download") {
        downloadFile(fileDescription.val(), fileDescription)
        return
    }
}

$(function () {
    window.parent.$("#ecm-navigation-inputFile-clone").on('change bind', function (e) {
        const filePhisical = this.files[0].name;

        inputFile.buttonId.val(filePhisical)
    })
})

function uploadFile() {
    try {
        let tabAttachments = parent.document.getElementById("tab-attachments");

        if (tabAttachments) {
            if (parent.WCMAPI.isIe9()) {
                $(".ecm-navigation-silverlight", parent.document).show("fade").css("top", 0);
                $("#ecm-navigation-silverlight", parent.document).attr({
                    "data-on-camera": "true"
                });
                $(parent.document).on("keyup", this.actionKeyup)
            } else {
                var element = parent.document.getElementById("ecm-navigation-inputFile-clone");
                if (element && document.createEvent) {
                    element.setAttribute("data-on-camera", "true");
                    element.click();
                }
            }
        }
    } catch (e) {
        FLUIGC.toast({
            type: "danger",
            title: "Atenção",
            message: "Houve um erro ao tentar fazer o upload do arquivo",
        })
        console.error(e)
    }
}

function anexo(event) {
    try {
        let acao = event.currentTarget.getAttribute("data-acao");
        let inputFile = $(event.currentTarget).parent().parent().find(".anexoId")[0];

        // let fileDescription = $(event.currentTarget).parent().parent().find(".anexo").val();
        // if (fileDescription == "") {
        // 	fileDescription = "Extrato Bancario.pdf";
        // 	$(event.currentTarget).parent().parent().find(".anexo").val(fileDescription);
        // } else if (fileDescription.substring(fileDescription.length - 3) !== "pdf") {
        // 	fileDescription = fileDescription + ".pdf";
        // 	$(event.currentTarget).parent().parent().find(".anexo").val(fileDescription);
        // }

        let fileDescription = $(event.currentTarget).parent().parent().find(".anexo").val();

        if (acao == "upload") {
            uploadFile(fileDescription, inputFile.id)
        }
        if (acao == "viewer") {
            viewerFile(fileDescription)
        }
        if (acao == "download") {
            downloadFile(fileDescription, inputFile.id)
        }
        if (acao == "delete") {
            removeFileConfirm(fileDescription, inputFile.id)
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função anexo")
        console.error(e)
    }
}



$(function () {
    try {
        window.parent.$("#ecm-navigation-inputFile-clone").on('change bind', function (e) {
            const inputNameFile = this.getAttribute("data-inputNameFile");
            const fileDescription = this.getAttribute("data-file-name-camera");
            const filePhisical = this.files[0].name;
            // if (fileDescription && fileDescription) {
            // 	$.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
            // 		var descricao = attachment.description;
            // 		if (fileDescription == descricao) {
            // 			parent.WKFViewAttachment.removeAttach([i]);
            // 			setFilePhisicalName(inputNameFile, "");
            // 		}
            // 	});
            // setFilePhisicalName(inputNameFile, filePhisical);
            // }
        });
    } catch (e) {
        console.error("Houve um erro inesperado ao selecionar o arquivo")
        console.error(e)
    }
});

function viewerFile(fileDescription) {
    try {
        if (hasFileFluig(fileDescription)) {
            const anexos = parent.ECM.attachmentTable.getData();
            for (let i = 0; i < anexos.length; i++) {
                var descricao = anexos[i].description;
                if (fileDescription == descricao) {
                    parent.WKFViewAttachment.openAttachmentView('adm', anexos[i].documentId);
                    return
                }
            }
        } else {
            FLUIGC.toast({
                title: "Atenção",
                message: "Anexo não encontrado",
                type: "warning"
            });
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função viewerFile")
        console.error(e)
    }
}

function downloadFile(fileDescription, idInput) {
    try {
        const filename = getMode() == "VIEW" ? $(idInput).text() : $(idInput).val();
        FLUIGC.message.confirm({
            message: `Deseja baixar o anexo <b>${filename}</b>?`,
            title: 'Confirma&ccedil&atildeo',
            labelYes: 'Sim, quero baixar',
            labelNo: 'Não',
        }, function (result) {
            if (result) {
                $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
                    var descricao = attachment.description;
                    if (fileDescription == descricao) {
                        parent.WKFViewAttachment.downloadAttach([i]);
                    }
                });
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função downloadFile")
        console.error(e)
    }
}

function getAnexos(numprocess) {
    var c1 = DatasetFactory.createConstraint("processid", numprocess, numprocess, ConstraintType.MUST);
    var constraints = new Array(c1);
    var result = DatasetFactory.getDataset("dsGetAnexos", null, constraints, null);
    return result.values;
}

function removeFileConfirm(fileDescription, file) {
    try {
        // const filename = $(`#${idInput}`).val()
        FLUIGC.message.confirm({
            message: `Deseja remover o anexo <b>${fileDescription}</b>?`,
            title: 'Confirma&ccedil&atildeo',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não',
        }, function (result) {
            if (result) {
                removeFile(fileDescription, file)
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeFileConfirm")
        console.error(e)
    }
}


function removeFile(fileDescription, file) {
    let id = file.attr("id").split("Anexo")[0]
    try {
        $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
            if (attachment.description == fileDescription) {
                parent.WKFViewAttachment.removeAttach([i]);
                $("#"+id+"Anexo").val("")
                $("#"+id+"AnexoId").val("")
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeFile")
        console.error(e)
    }
}

function hasFileFluig(fileDescription) {
    try {
        const anexos = parent.ECM.attachmentTable.getData();
        for (let i = 0; i < anexos.length; i++) {
            var descricao = anexos[i].description;

            if (fileDescription == descricao) {
                return true
            }
        }
        return false
    } catch (e) {
        console.error('Houve um erro inesperado na função hasFileFluig')
        console.error(e)
    }
}