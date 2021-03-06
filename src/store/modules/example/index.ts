import { ActionContext } from 'vuex'

interface IState {
    example: string
}

const state: IState = {
    example: ''
}

const getters = {
    example: (state: IState) => state.example
}

const mutations = {
    mutationExample: (state: IState, payload: string) => (state.example = payload)
}

const actions = {
    acionExample: ({ commit, dispatch }: ActionContext<any, any>, example: string) => {}
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
