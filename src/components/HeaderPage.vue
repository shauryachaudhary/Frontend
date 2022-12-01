<template>
    <nav class="navbar">
        <router-link class="logo link" to="/">
            <img src="../assets/logo.png" alt="Chanty Logo" width="40" height="40" />
            <span class="logoText">Chanty</span>

        </router-link>
        <div class="user" v-if="$store.getters.loginStatus">
            <div class="block">
                <img alt="" 
                @click="
                () => {
                    $store.commit('SET_PROFILESTATES', $store.getters.user);
                    $store.commit('TOGGLE_PROFILE');
                    $store.commit('SET_ISPROFILE', true);
                }
                "
                class="avatar"  
                :src="$store.getters.user.avatar"
                />
                <div class="user-info">
                    <h4 class="name">{{ $store.getters.profileStates.name }}</h4>
                </div>
            </div>
            <UilSignOutAlt 
            @click="logout" 
            :style="{
                    fontSize: '25px',
                    
                    color: '#d4122b',
                    cursor: 'pointer',
                }"
            />

        </div>
    </nav>
    </template>
<script>
import { UilSignOutAlt } from '@iconscout/vue-unicons';


export default {
    name: "HeaderPage",
    components: { 
        UilSignOutAlt, 
    },
    props: {
        title: {
            type: String,
            default: "Title",
        },
    },
    updated() {

    },
    mounted() {
        if (window.innerWidth < 600) {
            this.$store.commit("SET_MOBILE_VIEW", true);
        } else {
            this.$store.commit("SET_MOBILE_VIEW", false);
        }
    },
    created() {

    },
    methods: {
        logout() {
            localStorage.removeItem("user");
            this.$store.commit("LOGOUT");
            this.$router.push("/");
        },
    },
};
</script>
<style scoped>
.navbar {
    box-sizing: border-box;
    padding: 15px 10vw;
    transition: 600ms;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    position: fixed;
    top: 0;
}
.block {
    border: 2px solid rgba(0,255,255,0.7);
    border-radius: 10px;
    margin: 5px;
    margin-right: 1rem;
    
    
}
.navbar {    
    transition: 300ms;
    box-shadow: 0 0 2px rgba(0,255,255,0.7), 0 0 4px rgba(0,255,255,0.7), 0 0 6px rgba(0,255,255,0.7),
     0 0 15px rgba(0,255,255,0.7);

}
.user-info{
    margin-right: 12px; 
}
h4{
    margin-left: 13px;
}

.logoText{ 
    padding: -5rem;
}

.link {
    text-decoration: none;
    color: aliceblue;
    display: flex;
    align-items: center;
    transition: 300ms;
}

.link span{
    padding: 0 15px;
    font-size: 22px;
    font-weight: bold;

}
.user {
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.avatar {
    height: 30px;
    
    border-radius: 50%;
    width: 30px;
    margin: 3px 15px;
    cursor: pointer;
    object-fit: cover;
}

    
</style>