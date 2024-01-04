import { defineStore } from 'pinia'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER, IS_SCREENLOCKED } from '@/constant/mutation-types'
import { ResultEnum } from '@/enums/httpEnum'
import { storage } from '@/utils/Storage'

export type UserInfoType = {
  // TODO: add your own data
  name: string;
  email: string;
};

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: UserInfoType;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getAvatar(): string {
      return this.avatar
    },
    getNickname(): string {
      return this.username
    },
    getPermissions(): [any][] {
      return this.permissions
    },
    getUserInfo(): UserInfoType {
      return this.info
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setPermissions(permissions: any[]) {
      this.permissions = permissions
    },
    setUserInfo(info: UserInfoType) {
      this.info = info
    },
    // 登录
    async login(params: any) {
      console.log(params)
      // const response = await login(params)
      const response = {
        "code": 200,
        "result": {
          "token": "NYAAPHHLKVULUTWMLDTYBIONFIYEJFLN"
        },
        "message": "ok",
        "type": "success"
      }
      const {result, code} = response
      if (code === ResultEnum.SUCCESS) {
        const ex = 7 * 24 * 60 * 60
        storage.set(ACCESS_TOKEN, result.token, ex)
        storage.set(CURRENT_USER, result, ex)
        storage.set(IS_SCREENLOCKED, false)
        this.setToken(result.token)
        this.setUserInfo(result as unknown as UserInfoType)
      }
      return response
    },

    // 获取用户信息
    async getInfo() {
      // const result = await getUserInfoApi()
      const result = {
        "userId": "1",
        "username": "admin",
        "realName": "Admin",
        "avatar": "http://dummyimage.com/88x31",
        "desc": "manager",
        "password": "XCTUULIMI",
        "token": "NYAAPHHLKVULUTWMLDTYBIONFIYEJFLN",
        "permissions": [
          {
            "label": "主控台",
            "value": "dashboard_console"
          },
          {
            "label": "监控页",
            "value": "dashboard_monitor"
          },
          {
            "label": "工作台",
            "value": "dashboard_workplace"
          },
          {
            "label": "基础列表",
            "value": "basic_list"
          },
          {
            "label": "基础列表删除",
            "value": "basic_list_delete"
          }
        ]
      }
      if (result.permissions && result.permissions.length) {
        const permissionsList = result.permissions
        this.setPermissions(permissionsList)
        this.setUserInfo(result as unknown as UserInfoType)
      } else {
        throw new Error('getInfo: permissionsList must be a non-null array !')
      }
      this.setAvatar(result.avatar)
      return result
    },

    // 登出
    async logout() {
      this.setPermissions([])
      this.setUserInfo({name: '', email: ''})
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
    },
  },
})

// Need to be used outside the setup
export function useUser() {
  return useUserStore(store)
}
