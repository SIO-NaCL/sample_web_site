// /js/include.js
window.addEventListener('DOMContentLoaded', async () => {
  // 共通部品を読み込んで <body> に直接挿入する汎用関数
  const insert = async (file, position) => {
    try {
      const resp = await fetch(file);
      if (!resp.ok) throw new Error(`${file}: ${resp.status}`);
      const html = await resp.text();
      document.body.insertAdjacentHTML(position, html); // afterbegin / beforeend
    } catch (e) {
      console.error('Include error →', e);
    }
  };

  // ヘッダーを <body> 先頭に、フッターを末尾に
  await Promise.all([
    insert('/header.html', 'afterbegin'),
    insert('/footer.html', 'beforeend')
  ]);

  /* ===== ここ以降は “共通パーツが挿入済み” =====
     例: 現在ページに active クラスを付ける、メニュー開閉など */
});
