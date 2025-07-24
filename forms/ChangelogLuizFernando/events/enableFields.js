/**
 *
 *
 * @param {FormController} form
 */
function enableFields(form) {
    var activity = getValue("WKNumState");

    // Desabilita os campos apenas na atividade 5 (Análise da Sugestão)
    if (activity == 5) {
        form.setEnabled("emailSolicitante", false);
        form.setEnabled("nomeSolicitante", false);
        form.setEnabled("tituloMelhoria", false);
        form.setEnabled("descricaoMelhoria", false);
    }

    if (activity == 9) {
        form.setEnabled("emailSolicitante", false);
        form.setEnabled("nomeSolicitante", false);
        form.setEnabled("tituloMelhoria", false);
        form.setEnabled("descricaoMelhoria", false);
    }
}
