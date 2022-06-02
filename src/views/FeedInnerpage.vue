<template>
    <div>
        <Header></Header>
        <span>I am feed {{id}} inner</span>
    </div>
    
</template>

<script>
import Header from "@/components/Header.vue";

export default {
    name:'Feed Innerpage',
    components: {
        Header,
    },
    data() {
        return {
            id:'',
        }
    },
    mounted() {
        this.id = this.$router.params.id;
    }

}
</script>

<style scoped>

</style>