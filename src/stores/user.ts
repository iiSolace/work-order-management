import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/workOrder'

const STORAGE_KEY = 'work-order-user'

function readStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? (JSON.parse(raw) as UserInfo) : null
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo | null>(readStoredUser())
  const isLoggedIn = computed(() => Boolean(user.value))
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(username: string) {
    const nextUser: UserInfo = {
      username,
      role: username === 'admin' ? 'admin' : 'user',
    }

    user.value = nextUser
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    user,
    isLoggedIn,
    isAdmin,
    login,
    logout,
  }
})
