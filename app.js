
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 静的ファイルをpublicフォルダから提供
app.use(express.static(path.join(__dirname, 'public')));

// ルートパスにアクセスがあったらindex.ejsをレンダリング
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ホームページを表示
app.get('/', (req, res) => {
  res.render('index');  // index.ejsを表示
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});