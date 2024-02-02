
	
	// 2. Define some routes
	// Each route should map to a component. The "component" can
	// either be an actual component constructor created via
	// `Vue.extend()`, or just a component options object.
	// We'll talk about nested routes later.
	const routes = [
	  { path: '/', component: Home },
	  { path: '/home', component: Home },
	  { path: '/mySettings', component: MySettings },
	  { path: '/settings/users', component: Users },
	  { path: '/user/:id', component: Users },
	  { path: '/settings/groups', component: Groups },
	  { path: '/group/:id', component: Groups },
	  { path: '/settings/signatures', component: Signs },
	  { path: '/sign/:id', component: Signs },
	  { path: '/settings/products', component: Products },
	  { path: '/settings/offers', component: Offers },
	  { path: '/settings/tsp', component: Tsp },
	  { path: '/tsp/:id', component: Tsp },
	  { path: '/dlc/sous', component: DlcSous },
	  { path: '/dlc/activ', component: DlcActiv },
	  { path: '/search/autos', component: Autos },
	  { path: '/search/cards', component: SearchCards },
	  { path: '/cards/:id', component: Cards},
	  { path: '/reconc/rapp', component: Rappro }
	]

	// 3. Create the router instance and pass the `routes` option
	// You can pass in additional options here, but let's
	// keep it simple for now.
	const router = new VueRouter({
	  routes // short for `routes: routes`
	})

	router.beforeEach((to, from, next) => {
		
// 		if (to.name == 'login' /*&& isLoggedIn()*/) {
// 		    next({ path: '/' })
// 		}
		
		  if (!to.meta.allowAnonymous && !isLoggedIn()) {
              window.location.href="login.html";
		  }
		  else {
		    next()
		  }  
		})
