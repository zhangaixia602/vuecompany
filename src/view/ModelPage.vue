<template>
	<component :is="currentComponent"></component>
</template>
<script>
	import InsectPage from '@/view/InsectPage'
	import FactoryPage from '@/view/FactoryPage'
	import waterPage from '@/view/waterPage'
	import GranaryPage from '@/view/GranaryPage'
	import EnvironmentPage from '@/view/EnvironmentPage'
	import EarthPage from '@/view/EarthPage'
	import LoginPage from '@/view/LoginPage'
	import TestPage from '@/view/TestPage'
	import PracticalTraine from '@/view/PracticalTraine'
	export default {
		name: 'ModelPage',
		components: {
			'InsectPage': InsectPage,
			'FactoryPage': FactoryPage,
			'waterPage': waterPage,
			'GranaryPage': GranaryPage,
			'EnvironmentPage': EnvironmentPage,
			'EarthPage': EarthPage,
			'LoginPage': LoginPage,
			'TestPage': TestPage,
			"PracticalTraine":PracticalTraine
		},
		data() {
			return {
				currentComponent: '',
				Allcomps: [{
						id: 'insect',
						component: 'InsectPage'
					},
					{
						id: 'factory',
						component: 'FactoryPage'
					},
					{
						id: 'water',
						component: 'waterPage'
					},
					{
						id: 'granary',
						component: 'GranaryPage'
					},
					{
						id: 'environ',
						component: 'EnvironmentPage'
					},
					{
						id: 'earth',
						component: 'EarthPage'
					},
					{
						id: 'login',
						component: 'LoginPage'
					},
					{
						id: 'test',
						component: 'TestPage'
					},
					{
						id:'traine',
						component:"PracticalTraine"
					}
				]
			}
		},
		methods: {
			upData() {
				this.Allcomps.map((item) => {
					if (item.id == this.$route.params.id) {
						this.currentComponent = item.component
					}
				})
			}
		},
		mounted() {
			this.upData();
		}
	}
</script>
