import Vue from 'vue';
import Vuex from 'vuex';
import { AuthModule } from './AuthModule/auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        AuthModule
    }
})
