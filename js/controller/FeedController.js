
var feedsModule = angular.module('feedModule', []);

feedsModule.service("FeedsService", function() {
	
	var allFeeds = [];
	
	var Feed = function (id, type) {
		this.id = id;
		this.type = type;
		this.time = new Date();
	};
	
	Feed.prototype = {
			getID: function () { return this.id; },
			getType: function () {return this.type },
			getTime: function () {
				return 	this.time.getDate() + "/" +
						(this.time.getMonth() + 1) + "/" +
						this.time.getFullYear() + " " +
						(this.time.getHours() > 12 ? this.time.getHours() - 12 : this.time.getHours()) + ":" +
						this.time.getMinutes() + " " + (this.time.getHours() > 12 ? "PM" : "AM");
			}
	};
	
	/*
	function TextFeed(id, text) {
	    this.id = id;
		this.type = "Text";
	    this.text = text;
	    this.time = new Date();
	}

	
	TextFeed.prototype = Object.create(Feed.prototype);
	TextFeed.prototype.getFeed = function() {
	    return this.text;
	}

	
	function URLFeed(id, url) {
		this.id = id;
		this.type = "URL";
	    this.url = url;
	    this.time = new Date();
	}


	var getFeedCounter = function() {
		var count = 0;
		return function () {
			count++;
		};
	}();
	
	
	URLFeed.prototype = Object.create(Feed.prototype);
	URLFeed.prototype.getFeed = function() {
	    return this.url;
	}
	
	this.addFeed = function(feedText) {
		
		var feed;
		
		if (feedText.length > 4 &&
			feedText.substring(0,4).toLowerCase() == 'http' ||
			feedText.substring(0,3).toLowerCase() == 'www') {
			
			if (feedText.substring(0,3).toLowerCase() == 'www') {
				feedText = 'http://' + feedText;
			}
			
			feed = new URLFeed(getFeedCounter(), feedText);
		}
		else {
			if (feedText.length > 0) {
				feed = new TextFeed(getFeedCounter(), feedText);
			}
			else {
				console.log('Sorry! We do not add Empty Feeds!!');
			}
		}
	};
	
	this.deleteFeed = function(feedID) {
		console.log('To be implemented!!!! YET!!!');
	};
	
	this.list = function() { return allFeeds; };*/
	// Item List Arrays
    var items = [];    
	
	  // Add Item to Checked List and delete from Unchecked List
    this.deleteFeed = function (id) {
    	
        for (var i = 0, length = items.length; i < length; i++) {
        	if (id === items[i].id) {
         		items.splice(i, 1);
        	}
        } 
       
    };
	

    // Add a Item to the list
    this.addFeed = function (feedText) {

        items.push({
        	id :items.length,
            feedText: feedText
        });

        // Clear input fields after push
              

    };

this.list= function(){
	return items;
};

});



feedsModule.controller('FeedController', ['$scope', 'FeedsService', function($scope, feedsService) {
	
	$scope.feedsList =  feedsService.list();
	
	$scope.deleteFeed = function(id) {
		feedsService.deleteFeed(id);
	};
	
	$scope.addFeed = function() {
		feedsService.addFeed($scope.feedText);
		$scope.feedText="";
	};
	
}]);
