/* Living-network animation behind the page-header title on inner pages.
   Renders into <canvas class="page-header-net"> inside <header class="page-header">.
   Subtle gold/white nodes drifting and connecting on the navy banner. */
(function () {
  var header = document.querySelector('.page-header');
  if (!header) return;
  var canvas = header.querySelector('canvas.page-header-net');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var GOLD = '255, 209, 0';
  var WHITE = '255, 255, 255';
  var LINK_DIST = 120;   // px within which nodes connect
  var DENSITY = 7000;    // one node per this many px² (lower = more nodes)
  var W, H, DPR, nodes;

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function seed() {
    var count = Math.max(22, Math.min(80, Math.round((W * H) / DENSITY)));
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 1.2,
        gold: Math.random() < 0.33
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          var alpha = (1 - d / LINK_DIST) * 0.4;
          var gold = a.gold || b.gold;
          ctx.strokeStyle = 'rgba(' + (gold ? GOLD : WHITE) + ', ' +
            (alpha * (gold ? 0.85 : 0.5)) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.gold ? 'rgba(' + GOLD + ', 0.9)' : 'rgba(' + WHITE + ', 0.75)';
      ctx.fill();
    }
  }

  function step() {
    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    draw();
    requestAnimationFrame(step);
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = header.clientWidth;
    H = header.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed();
    if (reduce) draw();   // one static frame, no motion
  }

  window.addEventListener('resize', resize);
  window.addEventListener('load', resize);   // re-fit after web fonts settle
  resize();
  if (!reduce) step();
})();
