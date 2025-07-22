function beforeStateEntry(sequenceId){
    var proxAtividade = getValue("WKNextState");
    var fluigid = getValue("WKNumProces") + ''

    if(proxAtividade == 5){
		hAPI.setCardValue("numFluig", fluigid)
	}
}