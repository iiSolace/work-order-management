<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/User'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const formState = ref<User>({
    username: '',
    password: '',
})

// 登录处理
async function handleLogin() {
    if (!formState.value.username.trim()) {
        message.warning('请输入用户名')
        return
    }

    loading.value = true
    try {
        userStore.login(formState.value.username.trim())
        message.success(`登录成功，当前身份：${userStore.isAdmin ? '管理员' : '普通用户'}`)
        await router.push('/home')
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="login-page">
        <div class="login-panel">
            <div class="login-panel__eyebrow">Work Order Console</div>
            <h1>工单管理系统</h1>
            <a-form :model="formState" layout="vertical">
                <a-form-item label="用户名">
                    <a-input v-model:value="formState.username" placeholder="请输入用户名" size="large"/>
                </a-form-item>
                <a-form-item label="密码">
                    <a-input v-model:value="formState.password" placeholder="请输入密码" size="large" type="password"
                        @pressEnter="handleLogin" />
                </a-form-item>
                <a-button block size="large" type="primary" :loading="loading" @click="handleLogin">
                    登录
                </a-button>
            </a-form>
        </div>
    </div>
</template>
