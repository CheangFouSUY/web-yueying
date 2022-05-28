<template>
  <el-rate v-model="value" @change="selectRate(value)" :colors="colors"></el-rate>
</template>

<script>
export default {
    data(){
        return{
            value:0,
            colors:['#99A9BF', '#F7BA2A', '#FF9900']
        }
    },
    methods:{
        selectRate(value){
            console.log(value);
        }
    }
}
</script>