/**
 *
 *   === SimpleTree ===
 *   By Jacob Marshall
 *
 *   Version: 1.0 (stable)
 *   Date: Saturday 6th October 2012
 *   Type: source
 *
 *   Licence: WTFPL
 *   ^ See http://en.wikipedia.org/wiki/WTFPL
 *
 */

(function( $ ) {
	
	var methods = {
	
		/* Initialise tree */
		init : function (opt) { 
		
			var tree = this;
		
			var options = $.extend({
				structure: [],
				showSubFolders: false
			}, opt);
			
			tree.find(".tree-root li > a").live("click", function (event) {
			
				var link = $(this);
				var item = link.parent();
				if(isParent(item))
				{
					item.toggleClass("open");
					return false;
				}
				else
				{
					tree.find(".selected").removeClass("selected");
					link.addClass("selected");
				}
			
			});
			
			tree.each(function () {
				
				createNode(options.structure, options.showSubFolders).addClass("tree-root").appendTo(this);
				
			});
		
			return tree;
		
		},
		
		/* Collapse the entire tree */
		collapse : function () {
			this.find(".tree-root li.parent.open").removeClass("open");
		},
		
		/* Expand the entire tree */
		expand : function () { 
			this.find(".tree-root li.parent").addClass("open");
		},
		
		remove: function () {
			this.find(".tree-root").remove();
		}
		
	};
	
	/* Creates a self looping node */
	var createNode = function (items, sub)
	{
		var ul = $("<ul />");
		
		for(index in items)
		{
			var item = items[index];
			var li = $("<li />");
			var a = $("<a />");
			
			a.text(item[0]).attr("href", item[1]).appendTo(li);
			
			if(item.length == 3)
			{
				if(sub)
				{
					var span = $("<span />");
					span.text(item[2].length).appendTo(li);
				}
			
				li.addClass("parent");
				createNode(item[2], sub).appendTo(li);
			}
			
			li.appendTo(ul);
		}
		
		return ul;
	}
	
	/* Checks is an element is a parent */
	var isParent = function (element)
	{
		return element.hasClass("parent");
	}

	/* The plugin */
	$.fn.simpleTree = function(method)
	{
		
		if(methods[method])
		{
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof method === 'object' || !method)
		{
			return methods.init.apply(this, arguments);
		}
			
	};

})( jQuery );