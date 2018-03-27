<template lang="html">
  <nav class="navbar is-transparent is-warning">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1 class="title has-text-black">Hacktiv-Overflow</h1>
      </a>
      <div class="navbar-burger burger" data-target="mainNavigation">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="mainNavigation" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Home
        </router-link>
        <router-link to="/list" class="navbar-item">
          Questions
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="css">
</style>
