webpackJsonp([1],{66:function(t,e,n){"use strict";var r=n(74),i=n(72),o=n(3),a=n(5);t.exports=i.extend({initialize:function(){this.load(),this.render();var t='<button class="refresh">Refresh</button>';this.navigation.html(t)},render:function(){var t=this,e=new r;e.getFirstPage({success:function(n){t.collection=e,t.insertPhotos(n)}})},events:function(){return o.extend({},i.prototype.events,{"click .refresh":"refresh"})},refresh:function(){var t=this;a(".loading__progress").css({width:0}),a(".loading").fadeIn("slow",function(){t.render()})}})},68:function(t,e,n){"use strict";var r=n(69);t.exports=r.extend({queryParams:{method:"flickr.photos.search"}})},69:function(t,e,n){"use strict";var r=n(27),i=n(71),o=n(70);t.exports=r.extend({model:i,url:o.apiBase+"?api_key="+o.key+"&format=json&nojsoncallback=1",parseRecords:function(t){return t.photos.photo},parseState:function(t,e,n){return n.totalPages=t.photos.pages,n.totalRecords=parseInt(t.photos.total),n},state:{pageSize:12,firstPage:1}})},70:function(t,e){"use strict";t.exports={key:"5b2014d08342e246c70538803960de8c",apiBase:"https://api.flickr.com/services/rest/",feeds:"https://api.flickr.com/services/feeds/"}},71:function(t,e,n){"use strict";var r=n(6);t.exports=r.Model.extend({thumbnail:function(){return"https://farm"+this.get("farm")+".staticflickr.com/"+this.get("server")+"/"+this.get("id")+"_"+this.get("secret")+"_q.jpg"},large:function(){return"https://farm"+this.get("farm")+".staticflickr.com/"+this.get("server")+"/"+this.get("id")+"_"+this.get("secret")+"_b.jpg"},title:function(){return this.get("title")},link:function(){return"https://www.flickr.com/photos/"+this.get("owner")+"/"+this.get("id")}})},72:function(t,e,n){"use strict";var r=(n(13),n(68),n(3)),i=n(5),o=n(29);n(28)(i),t.exports=Backbone.View.extend({el:"#main",photos:i(".photos"),navigation:i(".main__nav"),page:1,collection:null,load:function(){this.navigation.html(""),i(".fancybox").fancybox({openEffect:"none",closeEffect:"none"}),i(".loading__progress").css({width:0}),i(".loading").css({top:this.photos.offset().top,width:this.photos.outerWidth(),height:this.photos.outerHeight()}),i(".loading").show();var t='<button disabled class="prev">Previous</button><button class="next">Next</button>';this.navigation.html(t)},initialize:function(){this.load(),this.render()},events:{"keypress .search":"search","click .prev":"prev","click .next":"next"},search:function(t){if(13===t.which){var e=t.currentTarget.value.replace(/'/g,"").replace(/\W+/g,"-");Backbone.history.navigate("#/search/"+e)}},prev:function(){this.collection.hasPreviousPage()&&(this.page--,this.newPage())},next:function(){this.collection.hasNextPage()&&(this.page++,this.newPage())},newPage:function(){var t=this;i("button").attr("disabled",!0),i(".loading__progress").css({width:0}),i(".loading").fadeIn("slow",function(){t.render()})},insertPhotos:function(t){var e=this,a=n(73),s=r.template(a);if(t){e.photos.html(s({photos:t.models}));i(".draggable").bind("dragstart",function(t){var e=n(64);i(".drop-target").css({"background-image":'url("'+e+'")'}),window.dragSourceElement=i(this).children()}).bind("dragend",function(){var t=n(63);i(".drop-target").css({"background-image":'url("'+t+'")'})});var u=o(e.photos);u.on("done",function(){i(".loading").delay(450).fadeOut(),e.collection.hasNextPage()&&i(".next").attr("disabled",!1),e.collection.hasPreviousPage()&&i(".prev").attr("disabled",!1)});var l=0;u.on("progress",function(t,e){i(".loading__progress").css({width:++l/12*100+"%"}),console.log(l)})}else e.photos.html(s({photos:[]})),i(".loading").delay(450).fadeOut(),i("button").attr("disabled",!0)}})},73:function(t,e){t.exports='<% if (photos.length) { _.each(photos, function(photo) { %>\n  <div class="photo draggable">\n    <a class="photo__link fancybox" rel="gallery" href="<%= photo.large() %>" title="<%= photo.title() %>">\n      <img class="photo__image" src="<%= photo.thumbnail() %>" alt="<%- photo.get(\'title\') %>">\n    </a>\n  </div>\n<% }) } else { %>\n  <div class="error"><span class="error__message">No images found</span></div>\n<% } %>\n'},74:function(t,e,n){"use strict";var r=n(69);t.exports=r.extend({queryParams:{method:"flickr.photos.getRecent"}})}});