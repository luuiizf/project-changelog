export async function getChangelogs(baseUrl, options) {
  try {
    const url = `${baseUrl}/fluighub/rest/service/execute/datasearch`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    const res = await response.json();

    if (response.status !== 200) {
      throw new Error('Erro ao buscar dados do changelog');
    }

    if (res.code !== 200) {
      throw new Error('Erro ao buscar dados do changelog');
    }

    let resMessage = JSON.parse(res.message);
    resMessage = JSON.parse(resMessage.values[0].values);
    return resMessage;
  } catch (err) {
    console.error('Falha ao buscar dados do changelog:', err);
    throw err;
  }
}
