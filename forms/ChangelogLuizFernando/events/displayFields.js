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
}
