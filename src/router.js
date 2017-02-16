import Vue from 'vue'
import Router from 'vue-router'

import List from './components/articleList.vue'
import Article from './components/article.vue'

Vue.use(Router);

export default new Router({
	routes: [
		{path: '', name: 'list', component: List},
		{path: '/article/p/:id', name: 'article', component: Article}
	]
})