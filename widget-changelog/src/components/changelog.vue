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
          <h1 class="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Histórico de Alterações
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto">
            Acompanhe todas as novidades, melhorias e correções do sistema
          </p>
        </div>

        <!-- Version Cards -->
        <div v-for="version in groupedVersions" :key="version.versionNumber"
             class="bg-white mb-8 rounded-3xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">

          <!-- Version Header -->
          <div class="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div class="flex items-center space-x-4">
                <div class="bg-white/20 rounded-full p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 class="text-2xl lg:text-3xl font-bold text-white">
                  Versão {{ version.versionNumber }}
                </h3>
              </div>
              <div class="mt-3 sm:mt-0">
                <span class="inline-flex items-center px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(version.releaseDate) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Changes List -->
          <div class="divide-y divide-slate-100">
            <div v-for="(change, index) in version.changes" :key="index"
                 class="px-8 py-6 hover:bg-slate-50 transition-colors duration-200 group">

              <!-- Change Header -->
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div class="flex items-center space-x-4 mb-3 sm:mb-0">
                  <span :class="getLabelClass(change.changeType)"
                        class="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                    {{ change.changeType }}
                  </span>
                  <h4 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {{ change.changeTitle }}
                  </h4>
                </div>
              </div>

              <!-- Change Description -->
              <div v-if="change.changeDescription"
                   v-html="change.changeDescription"
                   class="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed mb-4">
              </div>

              <!-- Change Image -->
              <div v-if="change.changeImageId" class="mt-6">
                <div class="rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
                  <img :src="'/webdesk/streamcontrol/' + change.changeImageId"
                       alt="Imagem da alteração"
                       class="w-full h-auto object-cover" />
                </div>
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
import { mockChangelogData } from '../mock.js';
import { getChangelogs } from '../services/fluigService.js';
import options from '../services/options.json';

const baseUrl = "https://fluighml.rn.sebrae.com.br"

export default {
  name: 'ChangelogWidget',
  data() {
    return {
      rawValues: [],
      loading: true,
      error: null,
    };
  },
  computed: {
    groupedVersions() {
      if (!this.rawValues || this.rawValues.length === 0) return [];
      const groups = this.rawValues.reduce((acc, change) => {
        const { versionNumber, releaseDate } = change;
        if (!acc[versionNumber]) {
          acc[versionNumber] = { versionNumber, releaseDate, changes: [] };
        }
        acc[versionNumber].changes.push(change);
        return acc;
      }, {});
      return Object.values(groups).sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString + 'T00:00:00');
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('pt-BR', options);
    },
    getLabelClass(type) {
      const classes = {
        'Nova Funcionalidade': 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
        'Melhoria': 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
        'Correção de Bug': 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
        'Outro': 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border border-slate-300',
      };
      return classes[type] || 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border border-slate-300';
    }
  },
  async mounted() {
    this.loading = true;
    setTimeout(() => {
      this.rawValues = mockChangelogData.values;
      this.loading = false;
    }, 500);

    getChangelogs(baseUrl, options)
    console.log(getChangelogs(baseUrl, options))
      .then(data => {
        this.rawValues = data;
      })
      .catch(e => {
        this.error = "Não foi possível carregar as informações. Verifique as permissões do dataset.";
        console.error(e);
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>
