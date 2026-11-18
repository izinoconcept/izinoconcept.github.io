(function () {
  var idx = window.SEARCH_INDEX || [];
  var qEl = document.getElementById('q'), out = document.getElementById('search-results'), st = document.getElementById('search-status');
  if (!qEl || !out) return;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function rx(w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function tokens(q) { return q.toLowerCase().split(/[^a-z0-9.]+/).filter(function (t) { return t.length > 1; }); }
  function snippet(text, toks) {
    var low = text.toLowerCase(), pos = -1;
    for (var i = 0; i < toks.length; i++) { var p = low.indexOf(toks[i]); if (p > -1 && (pos < 0 || p < pos)) pos = p; }
    var start = Math.max(0, (pos < 0 ? 0 : pos) - 70), s = text.substr(start, 220);
    return (start > 0 ? '…' : '') + s + (start + 220 < text.length ? '…' : '');
  }
  function hi(s, toks) {
    s = esc(s);
    toks.forEach(function (t) { s = s.replace(new RegExp('(' + rx(esc(t)) + ')', 'gi'), '<mark>$1</mark>'); });
    return s;
  }
  function run(q) {
    var toks = tokens(q); out.innerHTML = '';
    if (!toks.length) { st.textContent = 'Type a word or phrase to search.'; return; }
    var res = idx.map(function (p) {
      var t = p.title.toLowerCase(), d = (p.desc || '').toLowerCase(), x = p.text.toLowerCase(), score = 0, all = true;
      toks.forEach(function (k) {
        var n = 0, c = (x.split(k).length - 1);
        if (t.indexOf(k) > -1) n += 10; if (d.indexOf(k) > -1) n += 4; n += Math.min(c, 8);
        if (!n) all = false; score += n;
      });
      return {p: p, score: all ? score : 0};
    }).filter(function (r) { return r.score > 0; }).sort(function (a, b) { return b.score - a.score; });
    st.textContent = res.length ? res.length + ' result' + (res.length > 1 ? 's' : '') + ' for “' + q + '”' : 'No results for “' + q + '”. Try a shorter or different word, or browse the Resources page.';
    out.innerHTML = res.map(function (r) {
      return '<div class="article-card" style="padding:18px 22px;margin-bottom:15px;"><h3 style="margin:0 0 6px;font-size:19px;"><a href="' + r.p.url + '">' + hi(r.p.title, toks) + '</a></h3><p style="margin:0;font-size:15px;color:#495057;">' + hi(snippet(r.p.text, toks), toks) + '</p></div>';
    }).join('');
  }
  var m = location.search.match(/[?&]q=([^&]*)/), q0 = m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  qEl.value = q0; if (q0) run(q0); else st.textContent = 'Type a word or phrase to search.';
  qEl.addEventListener('input', function () { run(qEl.value); });
})();
