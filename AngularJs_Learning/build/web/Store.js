
// one way of doing  it
//var HeaderCtrl = function($scope) { //$scope object is created by angular api and it contains model value for this view
//	$scope.appDetails =  {   //$ means self contained angularJs object
//		ti: "AvengersCollection",
//		tagline: "Pick your Favourite Once,it's all yours"
//	};
//};


//another way using one global variable only
/* 
 we can create module in order to prevent global variable from polluting
 eg. :-
 var myApp=angular.module("myApp",[]);    //there is only one global variable myApp and rest are its child
myApp.controller("HeaderCtrl",function($scope) { 
                $scope.appDetails =  {   
		ti: "AvengersCollection",
		tagline: "Pick your Favourite Once,it's all yours"
	};")
 */

var myApp=angular.module("myApp",["ngRoute" , "ngAnimate"]);

myApp.config(function($routeProvider) {  //cofiguration to config our dynamic part of page
	$routeProvider
		.when("/avg", {   //  /avgs is our navigation link that we provide in html page
			templateUrl: "partials/avgs.html",  // rel link of page
			controller: "ListCtrl"  // ng-controller 
		})
		.when("/kart", {
			templateUrl: "partials/kart.html",
                controller: "KartListCtrl"
		})
	.otherwise({
		redirectTo: "/avg"  // by default it will redirect to this link
	});
});

myApp.factory("avgService",function(){ // Injecting dependencies to get local $scope 
   var store=[
		{
			imgUrl: "captain.jpeg",
			name: "Captain America",
			price: "1000",
			rating: "4/5"
			},
		{
			imgUrl: "drax.png",
			name: "Drax",
			price: "200",
			rating: "3/5"
			},
		{
			imgUrl: "hulkbuster.jpg",
			name: "Hulk Buster",
			price: "500",
			rating: "3.5/5"
			},
		{
			imgUrl: "spiderman.jpg",
			name: "Spider Man",
			price: "1200",
			rating: "5/5"
			},
		{
			imgUrl: "thor.jpg",
			name: "Thor",
			price: "1500",
			rating: "4.5/5"
			},
		{
			imgUrl: "warmachine.jpg",
			name: "War Machine",
			price: "800",
			rating: "3.5/5"
			},
		{
			imgUrl: "blackpanther.jpg",
			name: "Black Panther",
			price: "700",
			rating: "4.5/5"
			},
		{
			imgUrl: "blackwidow.jpg",
			name: "Black Widow",
			price: "300",
			rating: "3/5"
			},
		{
			imgUrl: "drstrange.jpg",
			name: "Dr. Strange",
			price: "900",
			rating: "4.5/5"
			},
		{
			imgUrl: "hulk.jpg",
			name: "Hulk",
			price: "1800",
			rating: "5/5"
			},
		{
			imgUrl: "ironman.webp",
			name: "Iron Man",
			price: "2000",
			rating: "5/5"
			},
		{
			imgUrl: "starlord.jpg",
			name: "Star Lord",
			price: "50",
			rating: "2/5"
			},
		{
			imgUrl: "taskmaster.jpg",
			name: "Task Master",
			price: "100",
			rating: "2.5/5"
			}
	];
    return {
       getAvg : function()
       {
           return store;   //return collection to whereever we want
       }
   } 
});

myApp.factory("kartService",function(){
    var kart=[];
    return {
        getKart : function(){
            return kart;
        },
        addToKart : function(avg){
            kart.push(avg);
             
        },
        buy :function(avg){
            alert("You are not getting anything kid ,it's just a test module *_*",avg.name);
        }
        
    }
});



myApp.controller("KartListCtrl",function($scope,kartService){
    $scope.kart=kartService.getKart();
    $scope.buy=function(avg){
        kartService.buy(avg);
    }
});
myApp.controller("HeaderCtrl",function($scope , $location) { 
                $scope.appDetails =  {};  
	$scope.appDetails.ti= "Avengers Collection";
		$scope.appDetails.tagline="Pick your Favourite Once,it's all yours";
                
            $scope.nav={};
            $scope.nav.isActive=function(path){
                if(path===$location.path()){
                    return true;
                }
                return false;
            }
	});
    
myApp.controller("ListCtrl",function($scope,avgService,kartService) {
	$scope.store=avgService.getAvg();   //getting collection value from injector
	
	$scope.addToKart = function(avg) {
		kartService.addToKart(avg);
                alert("Item added successfully");
	};
        });

