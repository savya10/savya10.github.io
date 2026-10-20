// Theme toggle: flips between light and dark, remembering the choice.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');

  function current() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Highlight the nav link for the section currently in view.
(function () {
  var links = document.querySelectorAll('.nav a');
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('active'); });
      var link = byId[entry.target.id];
      if (link) link.classList.add('active');
    });
  }, { rootMargin: '-30% 0px -65% 0px' });

  document.querySelectorAll('main section[id]').forEach(function (s) { observer.observe(s); });
})();
