<template>
    <div class="userHead">
        <img width="40" height="40" :src="user.avatar" alt="" class="avatar" />
        <div class="user-info">
            <h3 class="chatName">
                {{ user.name }}

            </h3>
            <h6 v-show="user._id === '62530603ae30f4f77ec48adc'">
                ~creator

            </h6>
        </div>
        
    </div>
</template>
<script>

export default {
    props:{
        user:{
            default: { 
                name: "Shaurya Chaudhary",
                email: "Shauryac00@gmail.com",
                picture: "https://cdn-icons-png.flaticon.com/512/3237/3237472.png",
            },
        },
    },
    
};
</script>
<style scoped>
.userHead {
    width: 250px;
    padding: 20px 10px;
    display: flex;
    align-items: center;
    border: 1px solid #0014256b;
    cursor: pointer;
    margin-bottom: 5px;
    border-radius: 10px;
    transition: 100ms;
    justify-content: space-around;
    margin-left: 2px;
}
.userHead:hover{
    background: #0014256b;
    transition: 100ms;
}
@media only screen and (max-width: 600px) {
    .userHead {
        width: 100%;
    }
}
.userHead:active {
    box-shadow: 0 0 2px #7facff, 0 0 4px #7facff, 0 0 6px #7facff,
     0 0 10px #7facff;
     transition: 50ms;
}
.userHead img {
    border-radius: 50%;
    object-fit: cover;
}
    
</style>