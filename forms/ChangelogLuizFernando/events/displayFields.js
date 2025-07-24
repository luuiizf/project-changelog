/**
 *
 *
 * @param {FormController} form
 * @param {customHTML} customHTML
 */
function displayFields(form, customHTML) {
    var usuario = getValue("WKUser")
    var activity = getValue("WKNumState");
    var process = getValue("WKNumProces");
    var MODE = form.getFormMode();

    customHTML.append("<script>");
    customHTML.append("function getUser(){ return '" + usuario + "'};");
    customHTML.append("function getActivity(){ return '" + activity + "'};");
    customHTML.append("function getMode(){ return '" + MODE + "'};");
    customHTML.append("function getProcess(){ return '" + process + "'};");
    customHTML.append("</script>");

    if (activity == 4 || activity == 0) { 
        form.setVisibleById("painelSugestaoMelhoria", true);
        form.setVisibleById("painelAnaliseSugestao", false);
        form.setVisibleById("painelPreenchimentoChangelog", false);
    }

    if (activity == 5) {
        form.setVisibleById("painelSugestaoMelhoria", true);
        form.setVisibleById("painelAnaliseSugestao", true);
        form.setVisibleById("painelPreenchimentoChangelog", false);
    }

    if (activity == 9) {
        form.setVisibleById("painelSugestaoMelhoria", true);
        form.setVisibleById("painelAnaliseSugestao", false);
        form.setVisibleById("painelPreenchimentoChangelog", true);
    }
}
