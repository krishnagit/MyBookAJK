
var feedsModule = angular.module('feedsModule', []);

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
	
	/**
	 * Text Feed model
	 * @param {Number} id 
	 * @param {String} text
	 */
	function TextFeed(id, text) {
	    this.id = id;
		this.type = "Text";
	    this.text = text;
	    this.time = new Date();
	}

	// prototype
	TextFeed.prototype = Object.create(Feed.prototype);
	TextFeed.prototype.getFeed = function() {
	    return this.text;
	}

	/**
	 * URL Feed model
	 * @param {Number} id 
	 * @param {String} url
	 */
	function URLFeed(id, url) {
		this.id = id;
		this.type = "URL";
	    this.url = url;
	    this.time = new Date();
	}

	/**
	 * Singleton Feed Counter (Used for FeedId)
	 */
	var getFeedCounter = function() {
		var count = 0;
		return function () {
			count++;
		};
	}();
	
	// prototype
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
	
	this.list = function() { return allFeeds; };
});

feedsModule.controller('FeedsController', ['$scope', 'FeedsService', function($scope, feedsService) {
	
	$scope.feedsList =  feedsService.list();
	
	$scope.deleteFeed = function(feedID) {
		feedsService.deleteFeed(feedID);
	};
	
	$scope.addFeed = function() {
		feedsService.addFeed($scope.feedText);
	};
}]);
