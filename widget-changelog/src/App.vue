<script>
import ChangelogWidget from './components/changelog.vue';

export default {
  name: 'App',
  components: {
    ChangelogWidget
  }
};
</script>

<template>
  <div id="app">
    <link type="text/css" rel="stylesheet" href="https://fluighml.rn.sebrae.com.br/style-guide/css/fluig-style-guide.min.css"/>
    <div>
      <ChangelogWidget />
    </div>
  </div>
</template>
