
const SearchCards = Vue.component('SearchCards', {
	data: function () {
	    return {
	    	options: {
		    	json:false,
		    	csv:true,
		    	refresh:true,
		    	legend:true,
	        	defaultSize:30,
	        	id:53,
	        	timeout:15000,
	        	showProcessing:false,
	        },
	    	security: {
		    	readable:false,
	        },
	        datatable: {
		        footerProps: {
		        	'disable-items-per-page':true,
		        	'items-per-page-text':'',
		        },
	        },
	    	search: {
	    		qbe:qbeCards,
	    		grouped:false,
	        },
	        lastIndex:0,
	        selectedCriteria:[-1],
	        selectedOperator:["qbe.operators.equals"],
	        selectedValue:[],
	    	errorMessage:'',
	        dataItems: [],
	        filterItems: [],
	        exportFields: [
	        	'product','distributor','offer','contract','holderRef','lastname','firstname','status'
	        ],
	    }
	},

    computed: {
      computedHeaders () {
      	return [
            { text: this.$t('commons.cards.product'), 	align: 'center', value: 'product', },
            { text: this.$t('commons.cards.offer'), 	align: 'center', value: 'offer', },
            { text: this.$t('commons.cards.distrib'), 	align: 'center', value: 'distributor', },
            { text: this.$t('commons.cards.client'), 	align: 'center', value: 'client', },
            { text: this.$t('commons.cards.contract') , align: 'center', value: 'contract', },
            { text: this.$t('commons.holder.holderRef'), 	align: 'center', value: 'holderRef' },
            { text: this.$t('commons.holder.lastname'),	align: 'center', value: 'lastname' },
            { text: this.$t('commons.holder.firstname'), align: 'center', value: 'firstname' },
            { text: this.$t('commons.others.status'), 	align: 'center', value: 'status', width: '100px' },
		    { text: '', 	align: 'center', value: 'actions', sortable: false, width: '100px' },
		          ];
      },
    },

    template: `
    
<div id="listing">
	        <v-card>
            <v-card-title>
              <span class="text-h7">{{$t('messages.advancedSearch')}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
              
                <v-row v-for="(line, index) in selectedCriteria" >
                  <v-col cols="12" sm="6" md="3" >
                  				<v-select dense v-model="selectedCriteria[index]" :items="search.qbe" item-value="key" v-on:change="selectedValue[index]=null" :label="$t('qbe.commons.criteria')" >
					               <template v-slot:selection="{ item, index }">{{$t(item.criteria)}}</template>
                  	               <template v-slot:item="{ active, item, attrs, on }">
					                  <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
					                    <v-list-item-content>
					                      <v-list-item-title>
					                        <v-row no-gutters align="center">
					                        <span>{{$t(item.criteria)}}</span>
					                        </v-row>
					                      </v-list-item-title>
					                    </v-list-item-content>
					                  </v-list-item>
					                </template>
								</v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3" v-if="selectedCriteria[index]!=-1" >
					<v-select dense v-model="selectedOperator[index]" :items="search.qbe[selectedCriteria[index]].operators" :label="$t('qbe.commons.operators')" >
					               <template v-slot:selection="{ item, index }">{{$t(item)}}</template>
                  	               <template v-slot:item="{ active, item, attrs, on }">
					                  <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
					                    <v-list-item-content>
					                      <v-list-item-title>
					                        <v-row no-gutters align="center">
					                        <span>{{$t(item)}}</span>
					                        </v-row>
					                      </v-list-item-title>
					                    </v-list-item-content>
					                  </v-list-item>
					                </template>
					</v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3" v-if="selectedCriteria[index]!=-1">
                    <v-text-field  dense v-if="!search.qbe[selectedCriteria[index]].values" v-model="selectedValue[index]" :label="$t('qbe.commons.values')"  ></v-text-field>
                    <v-select dense     v-if="search.qbe[selectedCriteria[index]].values" v-model="selectedValue[index]" :items="search.qbe[selectedCriteria[index]].values" :label="$t('qbe.commons.values')" >
                    			<template v-slot:selection="{ item, index }">{{$t(item)}}</template>
                  	               <template v-slot:item="{ active, item, attrs, on }">
					                  <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
					                    <v-list-item-content>
					                      <v-list-item-title>
					                        <v-row no-gutters align="center">
					                        <span>{{$t(item)}}</span>
					                        </v-row>
					                      </v-list-item-title>
					                    </v-list-item-content>
					                  </v-list-item>
					                </template>
					</v-select>
                  </v-col>
                  <v-col cols="12" sm="2" md="1" ><v-btn text @click="newQbeLine" v-if="lastIndex===index && selectedCriteria[index]!=-1" ><v-icon>mdi-plus</v-icon></v-btn>
                  </v-col>
                  <v-col cols="12" sm="2" md="1" ><v-btn text @click="removeFromQbe(index)" v-if="selectedCriteria[index]!=-1"><v-icon>mdi-close</v-icon></v-btn>
                  </v-col>
                  <v-col cols="12" sm="2" md="1" ><v-btn text @click="consult" :disabled="options.showProcessing" v-if="lastIndex===index && selectedCriteria[index]!=-1"><v-icon >mdi-magnify-expand</v-icon></v-btn>
                  </v-col>
              	</v-row>
              	<v-row >
	              	<v-col><v-checkbox label="Dernière carte du contrat" v-model="search.grouped"></v-checkbox></v-col>
              	</v-row>
              	<span>Attention: seul les 50 premiers résultats seront affichés</span>
              </v-container>
            </v-card-text>
          </v-card>


<br/>
  <v-alert color="red" type="error" text v-if="!security.readable || errorMessage">{{errorMessage}}</v-alert>
    
   		<div class="loader" v-if="options.showProcessing"></div>
		<div id="flou" :class="{ 'flou': options.showProcessing }">
		 	
  <v-data-table v-if="security.readable" :headers="computedHeaders" :items="dataItems"  @current-items="eventFilterItems" :search="search.global" locale="fr" class="elevation-1" :footer-props="datatable.footerProps" :items-per-page="options.defaultSize">
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>{{ $t('title.Cards') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field v-model="search.global" :label="$t('messages.search')" hide-details="auto" prepend-icon="mdi-account-search"  clearable clear-icon="mdi-close" @click:clear="search.global=''" ></v-text-field>
        <v-divider class="mx-4" inset vertical ></v-divider>        
        <v-btn v-if="options.csv" :disabled="dataItems.length===0" color=" darken-1" text ><vue-blob-json-csv file-type="csv" file-name="cards" :data="filterItems" :fields="exportFields"><v-icon>mdi-microsoft-excel</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.json" :disabled="dataItems.length===0" color=" darken-1" text ><vue-blob-json-csv file-type="json" file-name="cards" :data="filterItems"><v-icon>mdi-code-json</v-icon></vue-blob-json-csv></v-btn>
        <v-btn v-if="options.refresh" :disabled="dataItems.length===0" color=" darken-1" text @click="consult"  ><v-icon>mdi-refresh</v-icon></v-btn>
        
        
      <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
    	<v-btn v-if="options.legend" color=" darken-1" text v-bind="attrs" v-on="on"><v-icon>mdi-map-legend</v-icon></vue-blob-json-csv></v-btn>
      </template>
      <span>
	      <v-icon class="mr-2" color="orange">mdi-cog-pause</v-icon> : {{ $t('qbe.values.waiting_building') }}<br />
	      <v-icon class="mr-2" color="orange">mdi-cog</v-icon> : {{ $t('qbe.values.building') }}<br />
	      <v-icon class="mr-2" color="orange">mdi-truck-check</v-icon> : {{ $t('qbe.values.shipped') }}<br />
	      <v-icon class="mr-2" color="green">mdi-check-bold</v-icon> : {{ $t('qbe.values.activated') }}<br />
	      <v-icon class="mr-2" color="red">mdi-minus-circle</v-icon> : {{ $t('qbe.values.blocked') }}<br />
	      <v-icon class="mr-2" color="red">mdi-clock-end</v-icon> : {{ $t('qbe.values.expired') }}<br />
    	</span>
    </v-tooltip>
        
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
    
      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='waitingBuild'" color="orange" v-bind="attrs" v-on="on">mdi-cog-pause</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.waiting_building') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='building'" color="orange" v-bind="attrs" v-on="on">mdi-cog</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.building') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="orange">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='shipped'" color="orange" v-bind="attrs" v-on="on">mdi-truck-check</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.shipped') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="green">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='activated'" color="green" v-bind="attrs" v-on="on">mdi-check-bold</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.activated') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="red">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='blocked'" color="red" v-bind="attrs" v-on="on">mdi-minus-circle</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.blocked') }}<br /></span>
      </v-tooltip>
      <v-tooltip right color="red">
	      <template v-slot:activator="{ on, attrs }">
	    	<v-icon  class="mr-2" v-if="item.status=='expired'" color="red" v-bind="attrs" v-on="on">mdi-clock-end</v-icon>
	      </template>
	      <span> {{ $t('qbe.values.expired') }}<br /></span>
      </v-tooltip>      
      
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" v-if="security.readable" @click="showCard(item.id)" >mdi-eye</v-icon>
    </template>
    
    <template v-slot:no-data>
      {{$t('errors.emptydata')}}
    </template>

  </v-data-table>	

	</div>

	
</div>



` ,  

    methods: {
	  initialize () {
            		
      },
	  consult () {
    	  	
    	  	this.options.showProcessing=true;
    	  	axios.get('/Casper/v1/search/cards?query='+this.analyseQbe()+'&grouped='+this.search.grouped, {
    			  headers: {
    			    'Authorization': 'Bearer '+getAuthToken()
    			  },
    			  timeout:this.options.timeout,
    			})
    			.then((res) => {
    	    	  	this.options.showProcessing=false;
    				this.errorMessage='';
    				this.dataItems=res.data.list;
    			})
    			.catch((error) => {
    	    	  	this.options.showProcessing=false;
    				this.dataItems=[];
    				this.errorMessage=this.$t('errors.'+error.code);
    			});
    
      },
      eventFilterItems: function(value){
          this.filterItems=value;
      },
      showCard: function(cardId){
    	  
    	  const routeData = this.$router.resolve({location: 'Cards'});
    	  const href = routeData.href.replace('search/', '');
    	  
    	  window.open(href+'/'+cardId+this.getRandomArbitrary(), '_blank');
    	  
//    	  router.push({ path: '/cards/'+cardId+this.getRandomArbitrary() })
      },
      getRandomArbitrary: function(){
    	  min = Math.ceil(100);
    	  max = Math.floor(999);
    	  return Math.floor(Math.random() * (max - min) + min);
      },
      analyseQbe () {

    	  var result = '';
    	  
    	  for (let i = 0; i < this.selectedCriteria.length; i++) {
    		  let criteria=this.selectedCriteria[i];
    		  if (criteria!=-1) {
        		  let operator=this.selectedOperator[i];
        		  let value=this.selectedValue[i];
        		  
        		  let _operator='';
        		  let _value='';
        		  switch (operator) {
	        		  case 'qbe.operators.equals': _operator='%3D'; break;
	        		  case 'qbe.operators.notequals': _operator='%21'; break;
	        		  case 'qbe.operators.start': _operator='%5B'; break;
	        		  case 'qbe.operators.end': _operator='%5D'; break;
	        		  case 'qbe.operators.contains': _operator='%7C'; break;
	        		  case 'qbe.operators.superior': _operator='%3E'; break;
	        		  case 'qbe.operators.inferior': _operator='%3C'; break;
	        		  default:
        		  }

        		  switch (value) {
	        		  case 'qbe.values.activated': _value='activated'; break;
	        		  case 'qbe.values.building': _value='building'; break;
	        		  case 'qbe.values.blocked': _value='blocked'; break;
	        		  case 'qbe.values.waiting_building': _value='waitingBuild'; break;
	        		  case 'qbe.values.shipped': _value='shipped'; break;
	        		  case 'qbe.values.expired': _value='expired'; break;
	        		  case 'qbe.values.irrev_blocked': _value='irreversiblyBlocked'; break;
	        		  case 'qbe.values.on': _value='on'; break;
	        		  case 'qbe.values.off': _value='off'; break;
	        		  case 'qbe.values.virtual': _value='virtual'; break;
	        		  case 'qbe.values.physical': _value='physical'; break;
	        		  default : _value=value;
        		  }
        		  
        		  if (criteria===3 || criteria===5) {
        			  _value=_value.replaceAll('-', '');
        		  }
        		  
        		  result+=qbeCards[criteria].htmlCode;
        		  result+=_operator;
        		  result+=_value;
        		  if (i < this.selectedCriteria.length-1) {
            		  result+='%5E';
        		  }
    		  }
    	  }

    	  return result;
    	  
      },
      removeFromQbe (index) {
    	  if (this.selectedCriteria.length>1) {
        	  const x = this.selectedCriteria.splice(index, 1);
        	  const y = this.selectedOperator.splice(index, 1);
        	  const z = this.selectedValue.splice(index, 1);
        	  
        	  this.lastIndex=this.selectedCriteria.length - 1;
        	  
    	  }
    	  else {
        	  const x = this.selectedCriteria.splice(index, 1);
        	  const y = this.selectedOperator.splice(index, 1);
        	  const z = this.selectedValue.splice(index, 1);
        	  this.selectedCriteria.push(-1);
        	  this.selectedOperator.push("qbe.operators.equals");
    	  }
        
      },
      
      newQbeLine () {
    	  this.selectedCriteria.push(-1);
    	  this.selectedOperator.push("qbe.operators.equals");
    	  this.lastIndex=this.selectedCriteria.length - 1;
      },
     

    },
    beforeMount(){
    
    		privilege = localStorage.getItem(this.options.id);
    
            if (!isLoggedIn()) {
            	this.logout();
            }
            else if (privilege === null) {
            	this.errorMessage=this.$t('errors.rules');
            }
            else {
            
            	this.security.readable=(privilege>=1);
            
            	if (!this.security.readable) {
            		this.errorMessage=this.$t('errors.rules');
            	}
            
            	this.initialize();

            }
        }
		});
