<template>
    <div 
    class="message" 
    :style="[
        !isSender(message.sender._id) ? { justifyContent: 'flex-end' } : {},
    ]"
    >
        <img 
        v-if="isSender(message.sender._id)" 
        :src="message.sender.avatar" 
        alt=""
        class="avatar"
        width="40" 
        height="40"
        />
        <span 
        class="msg" 
        :style="[
        isSender(message.sender._id)
        ? { borderLeft: '7px solid rgb(61, 97, 128)', background: '#001425' } 
        : { borderRight: '7px solid white', background: '#1fa8da' },
        ]"
        >
        {{ message.content }}
        </span>
        <span 
        class="time" 
        :style="[
            isSender(message.sender._id)
              ? { marginLeft: '55px' } 
         : { marginRight: '15px' },
         ]"
         >{{ time }}</span
        >
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: Object,
            required: true,

        },
    },
    data() {
        return {
            time: null,
        };
    },
    beforeMount() {
        console.log(this.message);
        let sentAt = new Date(this.message.createdAt)
        .toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        })
        .replace(",", "");
        this.time = sentAt;
    },
    methods: {
        isSender(senderId) {
            return senderId !== this.$store.getters.user._id;
        },
    },
};
</script>
<style scoped>

    .message {
        display: flex;
        align-items: center;
        height: fit-content;
        margin: 10px;
        padding-bottom: 10px;
        position: relative;
    }

    .avatar {
        border-radius: 50%;
        object-fit: cover;
        flex-basis: 40px;
        flex-grow: 0;
        flex-shrink: 0;
        
    }

    .msg {
        padding:8px;
        margin: 7px 15px;
        border-radius: 10px;
        text-align: left;
    }
    .time {
        position: absolute;
        font-size: 10px;
        color: #f1f1f193;
        bottom: 0;
    }
    
</style>