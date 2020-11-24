<template>
<div class="header-main">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">SideBusinessRadar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       

        <b-nav-item-dropdown text="Link" right>
          <b-dropdown-item href="#">未実装</b-dropdown-item>
          <b-dropdown-item href="#">未実装</b-dropdown-item>
          <b-dropdown-item href="#">未実装</b-dropdown-item>
          <b-dropdown-item href="#">未実装</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">未実装</b-dropdown-item>
          <b-dropdown-item href="#">未実装</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default{

}
</script>
<style>
.header-main{
    position:fixed;
    margin-top:auto;
    }
<style>