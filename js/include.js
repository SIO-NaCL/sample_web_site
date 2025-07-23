
window.addEventListener('DOMContentLoaded', async () => {
  // 共通部品を読み込んで <body> に挿入する汎用関数
  const insert = async (file, position) => {
    try {
      const resp = await fetch(file);
      if (!resp.ok) throw new Error(`${file}: ${resp.status}`);
      const html = await resp.text();
      document.body.insertAdjacentHTML(position, html);
    } catch (e) {
      console.error('Include error →', e);
    }
  };

  // ヘッダー／フッターを並列で挿入
  await Promise.all([
    insert('./header.html', 'afterbegin'),
    insert('./footer.html', 'beforeend')
  ]);

  /* ===== スクロール検知ロジック ===== */
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > header.clientHeight) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScrollY = currentY;
  });

  /* ==== ハンバーガーメニュー開閉 ==== */
  const menuBtn = document.querySelector('.menu-toggle');
  const nav     = document.querySelector('.site-nav');
  menuBtn?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
});
