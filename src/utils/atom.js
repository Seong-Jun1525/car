import { atom } from "recoil";

export const checkAtom = atom({
    key: 'checkAtom',
    default: '상태'
})

export const isStartScene = atom({
    key: 'isStart',
    default: false
})

export const stageOne = atom({
    key: 'stageOne',
    default: false
})

export const stageTwo = atom({
    key: 'stageTwo',
    default: false
})