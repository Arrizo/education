import fetch from '@/utils/fetch'
import {API_PATH} from '@/config/env'
export const courseDetails = (objJson) => fetch(API_PATH + '/course/api/course/view', objJson, 'POST')
export const commonSign = (objJson) => fetch(API_PATH + '/course/auth/course/sign', objJson, 'POST')
export const orderPay = (objJson) => fetch(API_PATH + '/system/auth/sys/addOrderPay', objJson, 'POST')
export const isPlayOver = (objJson) => fetch(API_PATH + '/course/api/course/user/study/log/appPlayOver', objJson, 'POST')
export const wechatPay = (objJson) => fetch('/weixin/https://api.mch.weixin.qq.com/sandboxnew/pay/getsignkey', objJson, 'POST')
