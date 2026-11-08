/*
 * CLIENT REVIEWS: edit ONLY the REVIEWS list below.
 * Add a review ONLY when it is genuine, from a real client, and the client agreed to publish it.
 * Stars, the average and the approval percentage are calculated automatically from this list.
 * Do not invent, edit the rating of, or pay for reviews: Google AdSense and consumer-protection rules treat that as deceptive.
 *
 * Format of one review (copy, fill in, and place inside the list, separated by commas):
 *   { name: "Full name or initials", org: "Company / role (optional)", rating: 5, date: "2026-11-08",
 *     text: "Their own words, unedited." }
 */
var REVIEWS = [
  // add real reviews here
];

(function () {
  var box = document.getElementById('reviews-summary'), list = document.getElementById('reviews-list');
  if (!box || !list) return;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function stars(r) {
    var h = '';
    for (var i = 1; i <= 5; i++) h += '<i class="fa ' + (r >= i ? 'fa-star' : (r >= i - 0.5 ? 'fa-star-half-o' : 'fa-star-o')) + '" aria-hidden="true"></i>';
    return '<span class="stars" aria-label="' + r + ' out of 5 stars">' + h + '</span>';
  }
  var n = REVIEWS.length;
  if (!n) {
    box.innerHTML = '<p class="rv-empty"><strong>No published reviews yet.</strong> We only show genuine feedback from real clients, so there are no ratings to display until clients choose to share one. If you have worked with us, we would value your honest review below.</p>';
    return;
  }
  var sum = 0, pos = 0, dist = {5:0,4:0,3:0,2:0,1:0};
  REVIEWS.forEach(function (r) { sum += r.rating; if (r.rating >= 4) pos++; dist[Math.round(r.rating)]++; });
  var avg = sum / n, pct = Math.round(pos / n * 100);
  var bars = [5,4,3,2,1].map(function (k) {
    var w = Math.round(dist[k] / n * 100);
    return '<div class="rv-row"><span>' + k + ' star</span><div class="rv-bar"><div style="width:' + w + '%"></div></div><span>' + w + '%</span></div>';
  }).join('');
  box.innerHTML = '<div class="rv-grid"><div class="rv-score"><div class="rv-avg">' + avg.toFixed(1) + '</div>' + stars(avg) + '<div class="rv-count">Based on ' + n + ' review' + (n > 1 ? 's' : '') + '</div><div class="rv-pct"><strong>' + pct + '%</strong> of reviewers rated us 4 or 5 stars</div></div><div class="rv-dist">' + bars + '</div></div>';
  list.innerHTML = REVIEWS.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }).map(function (r) {
    return '<div class="rv-item"><div>' + stars(r.rating) + ' <strong>' + esc(r.name) + '</strong>' + (r.org ? ' <span class="rv-org">· ' + esc(r.org) + '</span>' : '') + '</div><div class="rv-date">' + esc(r.date) + '</div><p>' + esc(r.text) + '</p></div>';
  }).join('');
})();

(function () {
  var f = document.getElementById('review-form'); if (!f) return;
  var msg = document.getElementById('review-msg'), btn = document.getElementById('review-btn');
  f.addEventListener('submit', function (e) {
    e.preventDefault(); btn.disabled = true; msg.className = 'rv-msg'; msg.textContent = 'Sending…';
    fetch(f.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(f) })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function () { f.reset(); msg.className = 'rv-msg ok'; msg.textContent = 'Thank you. Your review has been received and will be checked before it is published.'; })
      .catch(function () { msg.className = 'rv-msg err'; msg.textContent = 'Sorry, that did not send. Please email us at ' + 'i.zinoconcept' + '@gmail.com.'; })
      .then(function () { btn.disabled = false; });
  });
})();
