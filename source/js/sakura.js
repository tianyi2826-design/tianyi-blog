// ====== 樱花飘落效果 ======
(function() {
  var sakuraContainer = document.createElement('canvas');
  sakuraContainer.id = 'sakura-canvas';
  sakuraContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none;';
  document.body.appendChild(sakuraContainer);

  var ctx = sakuraContainer.getContext('2d');
  var width = sakuraContainer.width = window.innerWidth;
  var height = sakuraContainer.height = window.innerHeight;
  var sakuras = [];
  var maxSakuras = 50;

  function Sakura() {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.size = Math.random() * 10 + 10;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 1 + 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  Sakura.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.globalAlpha = this.opacity;

    // 绘制樱花花瓣
    ctx.beginPath();
    ctx.fillStyle = '#ffb8d0';
    for (var i = 0; i < 5; i++) {
      ctx.ellipse(0, -this.size / 2, this.size / 4, this.size / 2, (i * 72) * Math.PI / 180, 0, Math.PI * 2);
    }
    ctx.fill();

    // 花心
    ctx.beginPath();
    ctx.fillStyle = '#ff6b9d';
    ctx.arc(0, 0, this.size / 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  Sakura.prototype.update = function() {
    this.x += this.speedX + Math.sin(this.y / 50) * 0.5;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    if (this.y > height + this.size) {
      this.y = -this.size;
      this.x = Math.random() * width;
    }
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
    if (this.x < -this.size) {
      this.x = width + this.size;
    }
  };

  for (var i = 0; i < maxSakuras; i++) {
    sakuras.push(new Sakura());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    sakuras.forEach(function(sakura) {
      sakura.update();
      sakura.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', function() {
    width = sakuraContainer.width = window.innerWidth;
    height = sakuraContainer.height = window.innerHeight;
  });
})();

// ====== 点击文字特效 ======
(function() {
  var words = ['❤', '爱', '萌', 'LOVE', '棒', '么么哒', '好看', 'ヾ(≧▽≦*)o', '(๑•̀ㅂ•́)و✧', '٩(๑❛ᴗ❛๑)۶'];
  var colorful = ['#ff6b9d', '#f093fb', '#667eea', '#00fff9', '#ffb8d0', '#c44569'];

  document.addEventListener('click', function(e) {
    var word = words[Math.floor(Math.random() * words.length)];
    var color = colorful[Math.floor(Math.random() * colorful.length)];

    var span = document.createElement('span');
    span.textContent = word;
    span.style.cssText = [
      'position: fixed',
      'left: ' + e.clientX + 'px',
      'top: ' + e.clientY + 'px',
      'color: ' + color,
      'font-size: 16px',
      'font-weight: bold',
      'pointer-events: none',
      'z-index: 999999',
      'animation: clickText 1s ease-out forwards',
      'text-shadow: 0 0 10px ' + color
    ].join(';');

    document.body.appendChild(span);

    setTimeout(function() {
      span.remove();
    }, 1000);
  });

  // 添加动画样式
  var style = document.createElement('style');
  style.textContent = '@keyframes clickText { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-80px) scale(1.5); } }';
  document.head.appendChild(style);
})();

// ====== 鼠标跟随粒子效果 ======
(function() {
  var particles = [];
  var maxParticles = 20;

  document.addEventListener('mousemove', function(e) {
    if (particles.length < maxParticles) {
      createParticle(e.clientX, e.clientY);
    }
  });

  function createParticle(x, y) {
    var particle = document.createElement('div');
    particle.className = 'mouse-particle';
    var size = Math.random() * 8 + 4;
    var colors = ['#ff6b9d', '#f093fb', '#ffb8d0', '#c44569'];
    var color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = [
      'position: fixed',
      'left: ' + x + 'px',
      'top: ' + y + 'px',
      'width: ' + size + 'px',
      'height: ' + size + 'px',
      'background: ' + color,
      'border-radius: 50%',
      'pointer-events: none',
      'z-index: 99998',
      'animation: particleFade 0.8s ease-out forwards',
      'box-shadow: 0 0 10px ' + color
    ].join(';');

    document.body.appendChild(particle);
    particles.push(particle);

    setTimeout(function() {
      particle.remove();
      particles.shift();
    }, 800);
  }

  var style = document.createElement('style');
  style.textContent = '@keyframes particleFade { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0) translateY(-20px); } }';
  document.head.appendChild(style);
})();
