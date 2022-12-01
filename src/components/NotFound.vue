<template >
    <div class="not-found">
        <Lottie :options="{ animationData : jsonData }" :height="500" />
       
    </div>
</template>
<script>
import Lottie from "vue-lottie";
import jsonData from "../assets/notFound.json";
export default {
    data(){
        return {
            jsonData,
        };
    },
    components: {
        Lottie,
    },   
};
</script>
<style scoped>
.not-found {
    width: 100%;
    height: 80vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>