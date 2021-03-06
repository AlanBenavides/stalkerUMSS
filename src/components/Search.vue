<template>
    <div class="search">
        <div class="search_bar">
            <input
                type="search"
                @input="getMatches()"
                autofocus
                v-model="inputSearch"
                :spellcheck="false"
                placeholder="Ingresa el nombre del docente a buscar"
            />
            <button class="search_button" @click="sendMatch()">
                <BaseSystemIcons icon="search" />
            </button>
        </div>
        <ul class="search_options" v-show="search.length > 0">
            <div>Resultados</div>
            <li :key="index" class="search_option" v-for="(value, index) in search.slice(0, 5)" @click="fillInput(value), sendMatch()">
                <div>{{ value }}</div>
                <div>Facultad de Ciencias y Tecnologia | Fcyt</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import BaseSystemIcons from '@/components/BaseSystemIcons.vue'

import StringMatchManager from '@/classes/StringMatchManager'

@Component({
    components: {
        BaseSystemIcons
    }
})
export default class extends Vue {
    @Prop({ required: true }) content!: string[]
    @Prop({ required: true }) dispatchTo!: string
    stringMatchManager: StringMatchManager = new StringMatchManager()
    search: string[] = []
    inputSearch: string = ''

    mounted() {
        document.addEventListener('click', (e) => {
            const target: any = e.target
            if (!(target.nodeName === 'INPUT')) this.search = []
        })
    }

    getMatches() {
        this.search = this.stringMatchManager.foundMatches(this.inputSearch, this.content)
    }

    fillInput(option: string) {
        this.inputSearch = option.toUpperCase()
        this.search = []
    }

    sendMatch() {
        this.$store.dispatch(this.dispatchTo, this.inputSearch)
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/variables.scss';

.search {
    &_bar {
        height: 54px;
        border-radius: $border_radius;
        background-color: $primary_color;
        box-shadow: $box-shadow;
        display: flex;
        width: 100%;
    }

    &_options {
        background-color: $primary_color;
        border-radius: $border_radius;
        padding: 0 1rem;
        transition: 1s;

        > div {
            padding: 0.7rem 0;
            padding-bottom: 0.4rem;
        }

        li:nth-child(2) {
            border-top: 3px solid $secondary_color;
        }
    }

    &_option {
        width: 100%;
        list-style: none;
        transition: 1s;
        padding: 1rem 0;

        &:not(:last-child) {
            border-bottom: 1px solid $font_color;
        }

        div:nth-child(2) {
            font-size: 0.76rem;
            opacity: 0.7;
        }
    }

    &_button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: $font_color;
        width: 5rem;

        svg {
            width: 20px;
        }

        &:focus {
            outline: 0;
        }
    }

    input[type='search'] {
        background-color: $primary_color;
        border: none;
        border-radius: $border_radius;
        font-size: 14px;
        color: $font_color;
        padding-left: 1rem;
        width: 100%;
    }

    ::placeholder {
        color: $font_color;
    }
}
</style>
