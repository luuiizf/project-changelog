<style>
@import "tailwindcss";
</style>

<template>
  <div class="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen font-sans">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-6xl">

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center text-slate-600 py-20">
        <div class="text-center">
          <svg class="animate-spin mx-auto h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-lg font-medium">Carregando alterações...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-800 p-6 rounded-2xl shadow-md" role="alert">
        <div class="flex items-center">
          <svg class="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <p class="font-bold text-lg">Ocorreu um erro</p>
            <p class="text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-if="!loading && !error" class="space-y-10">

        <!-- Header Section -->
        <div class="text-center">
          <h1 class="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">Histórico de Alterações</h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto">
            Acompanhe todas as novidades, melhorias e correções do sistema
          </p>
          <button @click="abrirModal" class="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 rounded-md hover:from-slate-900 hover:to-slate-800 transition-all duration-300 mt-4">
            Sugerir Melhoria
          </button>
        </div>

        <!-- Modal -->
        <div v-if="modalAberto" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button @click="fecharModal" class="absolute top-2 right-2 text-slate-500 hover:text-slate-700">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-slate-800 mb-4">Sugerir Melhoria</h1>
            <div class="mb-4">
              <label for="versaoSelect" class="block text-slate-700 font-medium mb-2">Versão</label>
              <select id="versaoSelect" v-model="versaoSelecionada" class="w-full p-2 border border-slate-300 rounded-md">
                <option value="" disabled selected>Selecione a versão</option>
                <option v-for="version in groupedVersions" :key="version.numeroVersao" :value="version.numeroVersao">
                  {{ version.numeroVersao }}
                </option>
              </select>
            </div>
            <label for="email" class="block text-slate-700 font-medium mb-2">Email</label>
            <input type="email" placeholder="Preencha seu email" class="w-full p-2 border border-slate-300 rounded-md mb-4">
            <label for="titulo" class="block text-slate-700 font-medium mb-2">Título</label>
            <input type="text" placeholder="Preencha o título da sugestão" class="w-full p-2 border border-slate-300 rounded-md mb-4">
            <label for="sugestao" class="block text-slate-700 font-medium mb-2">Sugestão</label>
            <textarea placeholder="Preencha o que você deseja sugerir" class="w-full p-2 border border-slate-300 rounded-md mb-4"></textarea>
            <div class="flex justify-end">
              <button class="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition-all duration-300">
                Enviar
              </button>
              <button @click="fecharModal" class="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300">
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <!-- Version Cards -->
        <div v-for="version in groupedVersions" :key="version.numeroVersao" class="bg-white mb-8 rounded-3xl shadow-xl overflow-hidden border border-slate-200 transition-all duration-300 hover:scale-[1.02]">

          <!-- Header da Versão -->
          <div class="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div class="flex items-center space-x-4">
                <div class="bg-white/20 rounded-full p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 class="text-2xl lg:text-3xl font-bold text-white">Versão {{ version.numeroVersao }}</h3>
              </div>
              <div class="mt-3 sm:mt-0 flex items-center">
                <span class="inline-flex items-center px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ version.dataLancamento }}
                </span>
                <button @click="ocultarDetalhes(version.numeroVersao)" class="ml-4 bg-white text-black px-4 py-2 rounded-full hover:bg-slate-200 transition-all duration-300 shadow-md">
                  {{ detalhesOcultos.includes(version.numeroVersao) ? 'Mostrar' : 'Ocultar' }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="!detalhesOcultos.includes(version.numeroVersao)" class="p-6">



            <!-- Lista de Changes -->
            <div class="divide-y divide-slate-100">
              <div v-for="(change, i) in version.changes" :key="i" class="py-4">
                <span :class="getLabelClass(change.type)" class="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                  {{ change.type }}
                </span>
                <h4 class="text-xl font-bold text-slate-900 mt-1">{{ change.title }}</h4>
                <div v-html="change.description" class="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed mt-2"></div>
              </div>
            </div>

              <!-- Galeria de Imagens da Versão -->
              <div v-if="version.images.length" class="mb-6 grid grid-cols-3 gap-4">
              <div v-for="(url, i) in version.images" :key="i" class="rounded-lg overflow-hidden">
                <img :src="url" class="object-cover w-full h-32" />
              </div>
            </div>

          </div>
        </div>

        <!-- Empty State -->
        <div v-if="groupedVersions.length === 0" class="text-center py-20">
          <div class="mx-auto h-24 w-24 text-slate-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-600 mb-2">Nenhuma alteração encontrada</h3>
          <p class="text-slate-500">Não há registros de mudanças disponíveis no momento.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getChangelogs, getChangelogsWithFilters, consultarAnexos } from '../services/fluigService.js';

const baseUrl = "https://fluighml.rn.sebrae.com.br";

export default {
  name: 'ChangelogWidget',
  data() {
    return {
      versions: [],
      details: [],
      anexosMap: new Map(),
      loading: true,
      error: null,
      modalAberto: false,
      versaoSelecionada: '',
      detalhesOcultos: [],
    };
  },

  computed: {
    groupedVersions() {
      if (!this.versions.length || !this.details.length) return [];

      // Mapeia detalhes por versão (id)
      const detailsMap = new Map();
      this.details.forEach(d => {
        if (!detailsMap.has(d.masterid)) detailsMap.set(d.masterid, []);
        detailsMap.get(d.masterid).push(d);
      });

      // Constrói o array final
      return this.versions
        .map(v => {
          const changes = (detailsMap.get(v.id) || []).map(ch => ({
            title: ch.tituloFilho,
            description: ch.descricaoFilho,
            type: ch.tipoFilho
          }));

          return {
            ...v,
            images: this.anexosMap.get(v.numFluig) || [],
            changes
          };
        })
        .sort((a, b) => {
          const fmt = s => s.split('/').reverse().join('-');
          return new Date(fmt(b.dataLancamento)) - new Date(fmt(a.dataLancamento));
        });
    }
  },

  methods: {
    getLabelClass(type) {
      const classes = {
        'Nova Funcionalidade': 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
        'Melhoria': 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
        'Correção de Bug': 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
        'Outro': 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border border-slate-300',
      };
      return classes[type] || classes['Outro'];
    },
    abrirModal() {
      this.modalAberto = true;
      document.body.classList.add('overflow-hidden');
    },
    fecharModal() {
      this.modalAberto = false;
      document.body.classList.remove('overflow-hidden');
    },
    ocultarDetalhes(numeroVersao) {
      const i = this.detalhesOcultos.indexOf(numeroVersao);
      if (i === -1) this.detalhesOcultos.push(numeroVersao);
      else this.detalhesOcultos.splice(i, 1);
    }
  },

  async mounted() {
    this.loading = true;
    this.error = null;

    try {
      // 1) Pega versões e detalhes
      const [versions, details] = await Promise.all([
        getChangelogs(baseUrl),
        getChangelogsWithFilters(baseUrl)
      ]);
      this.versions = versions;
      this.details  = details;

      // 2) Busca anexos em paralelo por versão
      const anexosPorVersao = await Promise.all(
        this.versions.map(v =>
          consultarAnexos(baseUrl, v.numFluig)
            .then(a => ({ numFluig: v.numFluig, anexos: a }))
        )
      );

      // 3) Monta o mapa numFluig → [ downloadUrl ]
      this.anexosMap = new Map();
      anexosPorVersao.forEach(({ numFluig, anexos }) => {
        this.anexosMap.set(
          numFluig,
          anexos.map(a => a.downloadUrl)
        );
      });

      // Inicializa estados de detalhe oculto
      this.detalhesOcultos = this.versions.map(v => v.numeroVersao);

    } catch (e) {
      this.error = "Não foi possível carregar as informações. Verifique as permissões dos datasets.";
      console.error("Erro ao buscar dados do changelog:", e);
    } finally {
      this.loading = false;
    }
  }
};
</script>
