import { ref } from 'vue';

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

export function useSugestaoService() {
  const loading = ref(false)
  const error = ref(null)

  async function enviarSugestao(baseUrl, numProcesso, formFields, targetState, assignee) {
    loading.value = true
    error.value = null

    try {
      // Criptografa o número do processo
      const cryptoRes = await fetch(`${baseUrl}/fluighub/rest/service/execute/crypto`, {
        method: 'POST',
        body: JSON.stringify({
          endpoint: 'crypto',
          passphrase: numProcesso,
        }),
      })

      const cryptoData = await cryptoRes.json()
      const processId = cryptoData.message

      // Monta a chamada para o moveprocess
      const body = {
        endpoint: 'moveprocess',
        method: 'post',
        process: processId,
        params: JSON.stringify({
          assignee,
          targetState,
          asManager: true,
          formFields
        })
      }

      const response = await fetch(`${baseUrl}/fluighub/rest/service/execute/movestart-process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (data.code !== 200) {
        throw new Error(data.message || 'Erro ao iniciar/movimentar o processo.')
      }

    } catch (err) {
      error.value = (err).message
    } finally {
      loading.value = false
    }
  }

  return {
    enviarSugestao,
    loading,
    error
  }
}

// export async function enviarSugestao(baseUrl, dados) {
//   try {
//     const url = `${baseUrl}/fluighub2/rest/service/execute/datasearch`;

//     // ⚠️ ATENÇÃO: Verifique se estes nomes de campos (email, titulo, etc.)
//     // são os mesmos que seu dataset espera receber.
//     let parametros =
//       // ⚠️ ATENÇÃO: Troque 'dsSugestaoChangelog' pelo nome real do seu dataset de sugestão
//       `datasetId=dschangelogLuiz` +
//       // Lógica para iniciar um novo processo e movê-lo para a atividade 5
//       `&constraintsField=processId&constraintsInitialValue=0` +
//       // ⚠️ ATENÇÃO: Troque '5' pelo ID real da atividade de destino no Fluig
//       `&constraintsField=choosedState&constraintsInitialValue=5` +
//       `&constraintsField=email&constraintsInitialValue=${encodeURIComponent(dados.emailSolicitante)}` +
//       `&constraintsField=nome&constraintsInitialValue=${encodeURIComponent(dados.nomeSolicitante)}` +
//       `&constraintsField=titulo&constraintsInitialValue=${encodeURIComponent(dados.tituloMelhoria)}` +
//       `&constraintsField=descricao&constraintsInitialValue=${encodeURIComponent(dados.descricaoMelhoria)}`;

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         endpoint: 'dataset',
//         method: 'get',
//         params: parametros
//       })
//     });

//     if (!response.ok) {
//         throw new Error('Erro na comunicação com o servidor ao enviar a sugestão.');
//     }

//     const res = await response.json();
//     const message = JSON.parse(res.message);

//     // Tratativa de erro padrão para datasets Fluig
//     if (message.columns && message.columns[0].includes('ERROR')) {
//         const errorMessage = message.values[0]['ERROR: '] || 'Erro retornado pelo dataset.';
//         throw new Error(errorMessage);
//     }

//     // Se chegou aqui, tudo certo!
//     return message;

//   } catch (err) {
//     console.error('Falha ao enviar sugestão:', err);
//     // Re-lança o erro para que o componente Vue possa capturá-lo
//     throw err;
//   }
// }
