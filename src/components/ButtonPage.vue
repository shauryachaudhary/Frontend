<template>
        <button 
        class="btn" 
        :style="[leave ? { background: 'rgb(170, 0, 0)', padding: '8px 4px' } : {}]"
        >
            <span>{{ text }}</span>

            <UilUsersAlt v-if="group" />
            <UilEditAlt v-else-if="edit" />
            <UilSignOutAlt v-else-if ="leave" :style="{ fontSize: '25px' }" />
            <UilArrowRight v-else />


        </button>
</template>
<script>
import { UilSignOutAlt } from '@iconscout/vue-unicons';
import { UilEditAlt } from '@iconscout/vue-unicons';
import { UilUsersAlt } from '@iconscout/vue-unicons';
import { UilArrowRight } from '@iconscout/vue-unicons';


export default {
    props: {
        text: {
            type: String,
            default: "Next",
        },    
        group: {
            type: Boolean,
            default: false,
        },
        edit: {
            type: Boolean,
            default: false,
        },
        leave: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        UilArrowRight,
        UilSignOutAlt,
        UilUsersAlt,
        UilEditAlt,
        
    },
};
</script>
<style scoped>
.btn{
    background: #0b5b8d;
    padding: 8px 20px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 15px auto;
    font-size: 14px;
    font-weight: bold;
    border-radius: 40px;
    color: #fff;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    }
    
    .btn:hover {
        background: #092b46;
        box-shadow: 0 0 2px rgba(0,255,255,0.7), 0 0 4px rgba(0,255,255,0.7), 0 0 6px rgba(0,255,255,0.7), 0 0 8px rgba(0,255,255,0.7);
    }
    span {
        margin-right: 5px;
    }
</style>