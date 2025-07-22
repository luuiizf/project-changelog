export async function getChangelogs(baseUrl) {
  try {
    const url = `${baseUrl}/fluighub2/rest/service/execute/datasearch`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'dataset',
        method: 'get',
        params: 'datasetId=dschangelogLuiz'
      })
    });

    const res = await response.json();

    if (response.status !== 200) {
      throw new Error('Erro ao buscar dados do changelog');
    }

    if (res.code !== 200) {
      throw new Error('Erro ao buscar dados do changelog');
    }

    if (!res.message) throw new Error('Resposta da API não contém "message"');
    let resMessage = JSON.parse(res.message);
    if (!resMessage.values) {
      throw new Error('Estrutura inesperada em resMessage');
    }
    return resMessage.values;
  } catch (err) {
    console.error('Falha ao buscar dados do changelog:', err);
    throw err;
  }
}

export async function getChangelogsWithFilters(baseUrl) {
  try {
    const url = `${baseUrl}/fluighub2/rest/service/execute/datasearch`;
    const filtros =
      `datasetId=dschangelogLuiz` +
      `&constraintsField=tablename` +
      `&constraintsInitialValue=tableChanges` +
      `&constraintsFinalValue=tableChanges`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'dataset',
        method: 'get',
        params: filtros
      })
    });

    const res = await response.json();

    if (response.status !== 200) {
      throw new Error('Erro ao buscar dados do changelog com filtros');
    }

    if (res.code !== 200) {
      throw new Error('Erro ao buscar dados do changelog com filtros');
    }

    if (!res.message) throw new Error('Resposta da API não contém "message"');
    let resMessage = JSON.parse(res.message);
    if (!resMessage.values) {
      throw new Error('Estrutura inesperada em resMessage');
    }
    return resMessage.values;
  } catch (err) {
    console.error('Falha ao buscar dados do changelog com filtros:', err);
    throw err;
  }
}

export async function consultarAnexos(baseUrl) {
  try {
    const url = `${baseUrl}/fluighub2/rest/service/execute/datasearch`;
    const filtrarAnexos =
    `datasetId=dsGetAnexos` +
    `&constraintsField=processid` +
    `&constraintsInitialValue=135445` +
    `&constraintsFinalValue=135445`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'dataset',
        method: 'get',
        params: filtrarAnexos
      })
    });

    const res = await response.json();

    if (response.status !== 200) {
      throw new Error('Erro ao buscar anexos');
    }

    if (res.code !== 200) {
      throw new Error('Erro ao buscar anexos');
    }

    if (!res.message) throw new Error('Resposta da API não contém "message"');
    let resMessage = JSON.parse(res.message);
    if (!resMessage.values) {
      throw new Error('Estrutura inesperada em resMessage');
    }
    return resMessage.values;
  } catch (err) {
    console.error('Falha ao buscar anexos:', err);
    throw err;
  }
}


// export async function consultarAnexos(processid) {
//   try {
//     var consulta = DatasetFactory.createConstraint("processid", '135445', '135445', ConstraintType.MUST)

//     var attachmentsDs = DatasetFactory.getDataset(
// 		"dsGetAnexos",
// 		null,
// 		[consulta],
//     	null
// 	);

//     return attachmentsDs;
//   } catch (err) {
//     console.error('Falha ao buscar anexos:', err);
//     throw err;
//   }
// }
