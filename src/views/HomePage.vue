<template lang="">
    <div>
        <div class="container">
            <div class="buttonWrapper">
                <button 
                @click="
                () => {
                     loginTab = true;
                    }
                    " 
                    :class="['tabIcon', { active: loginTab }]"
                     > 
                     Login <UilSignInAlt />
                    </button>
                <button
                   @click="
                   () => {
                     loginTab = false;
                    }
                    "
                    :class="['tabIcon', { active: !loginTab }]"
                     > 
                     SignUp <UilUserPlus />
                     </button>
            </div>
            <div class="card" 
            :style="[isLoading ? {display: 'none' } :{}]">
                <h2> 
                    <img 
                    src="../assets/logo.png"  
                    alt="Chanty Logo" 
                    width="40"
                     height="40"
                      />
                      <span class="span">
                        Welcome to Chanty
                    </span> 
                </h2>
                <LogIn 
                v-if="loginTab" 
                @loading="setLoading(true)" 
                @stop="setLoading(false)" 
                />            
                <SignUp 
                v-else 
                @loading="setLoading(true)"
                @stop="setLoading(false)" 
                @signUp="setText" 
                />

            </div>
            <div :style="[!isLoading ? { display: 'none' } : {}]" class="loaderCard">
                <Loading :loaderText="loaderText" />
            </div>
            
        </div>
    </div>
</template>
<script>
import LogIn from "../components/LogIn.vue";
import  SignUp from "../components/SignUp.vue";
import Loading from "../components/LoadingPage.vue";
import { UilSignInAlt } from '@iconscout/vue-unicons';
import { UilUserPlus } from '@iconscout/vue-unicons'

export default {
    name: "HomePage",
    components:{
        LogIn,
        SignUp,
        Loading,
        UilSignInAlt,
        UilUserPlus,
      
    },
    data() {
        return {
            loginTab: true,
            isLoading: false,
            loaderText: "Logging In...",
        };
    },
    methods: {
        setLoading(val) {
            this.isLoading = val;
        },
        setText() {
            this.loaderText = "Signing You Up...";
        },
    },
    created() {
        const data = JSON.parse(localStorage.getItem("user"));
        if(data) {
            this.$store.commit("SET_NAME", data.name);
            this.$store.commit("SET_EMAIL", data.email);
            this.$store.commit("SET_AVATAR", data.avatar);
            this.$store.commit("SET_TOKEN", data.token);
            this.$store.commit("SET_ID", data._id);
            this.$store.commit("SET_LOGINSTATUS");

        }
        if (this.$store.getters.loginStatus) {
            this.$router.push("/chatPage");
        }
    },
};
</script>
<style scoped>
    .container {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        min-height: 80vh;
        height: fit-content;
        padding-top: 40px;
    }
    .child{
        margin-bottom: 1.2rem;
        display: flex;
        margin-left: -0.8rem;

    }
    
    h2 span{
        margin-left: 2.0rem;
        margin-top: 8px;
        
        
        
        
        
    }
    .buttonWrapper {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-x: visible;
    }
    .tabIcon {
        width: fit-content;
        padding: 10px 15px;
        background: #092b46;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 10px;
        margin-left: 15px;
        transition: all 300ms;
        font-size: 16px;
    }
    .tabIcon:hover, 
    .active {
        background: #001425;
        box-shadow: 0 0 2px rgba(0,255,255,0.7), 0 0 4px rgba(0,255,255,0.7), 0 0 6px rgba(0,255,255,0.7), 
        0 0 15px #7facff;
        transition: all 300ms;
    }
    

    .card,
    .loaderCard {
        width: 800px;
        min-height: 400px;
        height: fit-content;
        background: #092b46;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
    }
    
.loaderCard {
    animation: glowing 1.2s ease-in-out infinite;
  }
  
  @keyframes glowing {
    0% {
      box-shadow: 0 0 2px rgba(0,255,255,0.7), 0 0 4px rgba(0,255,255,0.7), 0 0 6px rgba(0,255,255,0.7),
        0 0 8px rgba(0,255,255,0.7);
    }
  
    50% {
      box-shadow: 0 0 15px rgba(0,255,255,0.7), 0 0 20px rgba(0,255,255,0.7), 0 0 30px rgba(0,255,255,0.7),
        0 0 40px rgba(0,255,255,0.7);
    }
  
    100% {
      box-shadow: 0 0 2px rgba(0,255,255,0.7), 0 0 4px rgba(0,255,255,0.7), 0 0 6px rgba(0,255,255,0.7),
        0 0 8px rgba(0,255,255,0.7);
    }
  }
  
  .card h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .card h2 img {
    width: 40px;
    margin: 0 10px;
  }
  
  @media only screen and (max-width: 600px) {
    .card,
    .loaderCard {
      width: 90vw;
      padding: 40px 20px;
    }
    .card h2 img {
      /* width: 70px; */
      margin: 0 10px;
    }
  }
  
  .headingWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .heading {
    font-size: 22px;
    font-weight: bold;
    margin-left: 10px;
  }  
</style>