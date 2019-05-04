<template>
    <div class="col-full err_wrapper">
        <div class="items">
            <h1 class="headin_lrg">404</h1>
            <h2 class="headin_sml">Oops! Page Not Found</h2>
            <p class="text_lrg">Sorry but the page you are looking for does not exist, have been removed or is
                temporarily
                unavailable</p>

            <span class="link_text">
            <router-link :to="{name:'PageHome'}">Back to  homepage</router-link>
        </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style scoped>
    .err_wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .headin_lrg {
        font-size: 150px;
    }

    .headin_sml {
        font-size: 50px;
    }

    .text_lrg {
        font-size: 25px;
        font-weight: 100;
    }

    .link_text {
        font-size: 30px;
    }
</style>
