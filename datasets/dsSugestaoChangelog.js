/**
 *
 *
 * @param {string[]} fields Campos Solicitados
 * @param {Constraint[]} constraints Filtros
 * @param {string[]} sorts Campos da Ordenação
 * @returns {Dataset}
 */
function createDataset(fields, constraints) {
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("resultado");

  try {
    var c1 = DatasetFactory.createConstraint("tablename", "sugestoes", "sugestoes", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("email", email, email, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("titulo", titulo, titulo, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("descricao", descricao, descricao, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("versao", versao, versao, ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("dataSugestao", data.toString(), data.toString(), ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("status", "Pendente", "Pendente", ConstraintType.MUST);

    var constraints = [c1, c2, c3, c4, c5, c6, c7];
    DatasetFactory.getDataset("dsSugestaoMelhoria", null, constraints, null);

    dataset.addRow(["OK"]);
  } catch (e) {
    dataset.addRow(["Erro: " + e.message]);
  }

  return dataset;
}


/**
 *
 */
function defineStructure() {

}

/**
 *
 *
 * @param {number} lastSyncDate
 */
function onSync(lastSyncDate) {

}

/**
 *
 *
 * @param user
 * @returns {DatasetMobileSync}
 */
function onMobileSync(user) {

}
