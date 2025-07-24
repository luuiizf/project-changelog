export async function getChangelogs(baseUrl) {
  try {
    const url = `${baseUrl}/fluighub2/rest/service/execute/datasearch`;
    const filtros =
      `datasetId=dschangelogLuiz` +
      `&constraintsField=status` +
      `&constraintsInitialValue=finalizado` +
      `&constraintsFinalValue=finalizado`;

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

export async function consultarAnexos(baseUrl, numFluig) {
  try {
    const url = `${baseUrl}/fluighub2/rest/service/execute/datasearch`;
    const filtrarAnexos =
    `datasetId=dsGetAnexos` +
    `&constraintsField=processid` +
    `&constraintsInitialValue=${numFluig}` +
    `&constraintsFinalValue=${numFluig}`;

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



export async function enviarSugestao(baseUrl, dados) {
  try {
    const url = `${baseUrl}/fluighub2/rest/service/execute/datasearch`;
    const parametros =
      `datasetId=dsSugestaoChangelog` +
      `constraintsField=email` +
      `&constraintsInitialValue=${dados.email}` +
      `&constraintsFinalValue=${dados.email}` +
      `&constraintsField=titulo` +
      `&constraintsInitialValue=${dados.titulo}` +
      `&constraintsFinalValue=${dados.titulo}` +
      `&constraintsField=descricao` +
      `&constraintsInitialValue=${dados.descricao}` +
      `&constraintsFinalValue=${dados.descricao}` +
      `&constraintsField=versao` +
      `&constraintsInitialValue=${dados.versao}` +
      `&constraintsFinalValue=${dados.versao}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'dataset',
        method: 'get',
        params: parametros
      })
    });

    const res = await response.json();

    if (response.status !== 200) {
      throw new Error('Erro ao enviar sugestão');
    }

    return res;

  } catch (err) {
    console.error('Falha ao enviar sugestão:', err);
    throw err;
  }
}
