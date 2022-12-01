<template>
    <div>
        <Lottie :options="{ animationData : jsonData }" :height="200" :width="200" />
        <p class="loaderText">{{ loaderText }}</p>
    </div>
</template>
<script>
import jsonData from "../assets/loader.json";
import Lottie from "vue-lottie";
export default {
    components: {
        Lottie,
    },
    props: {
        loaderText: {
            type: String,
            default: "Logging In...",
        },
    },
    data() {
        return {
            jsonData,
        };
    },
};
</script>
<style scoped>
    
</style>