<template>
<div>
<div>記事 id:13</div>
<span><router-link to="/articles/13/pages/1">
１ページ目</router-link></span>
<span><router-link to="/articles/13/pages/2">
２ページ目</router-link></span>
<hr />
<router-view />
</div>
</template>
<script>
export default{
}
</script>
