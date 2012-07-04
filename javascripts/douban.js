var douban = (function() {
  function appendScript(script_tag){
    document.getElementsByTagName('head')[0].appendChild(script_tag);
  }

  return {
    showUser: function(options) {
      var url = "http://api.douban.com/people/" + options.user + "/collection?alt=xd&callback=renderJSON";
      if (options.apikey.length > 0) url += "&apikey=" + options.apikey;
      if (options.category.length > 0) url += "&cat=" + options.category;

      var script_tag = document.createElement('script');
      script_tag.setAttribute('type', 'text/javascript');
      script_tag.setAttribute('src', url);
      script_tag.setAttribute('charset', 'utf-8');

      appendScript(script_tag);
    }
  };
})();

function renderJSON(status) {
  var i = 0, fragment = '',
      t = $('#douban_status')[0],
      entry = status['entry'];

  for (i = 0; i < entry.length && i < 9; i++) {
    if (i % 3 == 0) {
      fragment += '<li>';
    }
    var subject = entry[i]["db:subject"],
        link = subject["link"][1]["@href"],
        img_src = subject["link"][2]["@href"],
        aiotitle = entry[i]["title"]["$t"];
    fragment += '<a target="_blank" aiotitle="' + aiotitle + '" href="' + link + '"> <img src="' + img_src + '"> </a>';
    if (i % 3 == 2) {
      fragment += '</li>';
    }
  }
  t.innerHTML = fragment;
}

