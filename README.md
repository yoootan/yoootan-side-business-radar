# side-business-radar

> A Vue.js project

## Overview

副業の種類の割合や収入を調査、閲覧できるアプリです

使用言語はVue,プラグインはvue-cahartjsを使用しています

DBはFirestoreを採用

## Point

難しかった点です

・チャート同士を連動させてクリックで動的に変更するようにした
・axiosによる非同期通信なので、処理の順番をasync,awaitで制御した
・NoSQLを初めて使ったので仕様の違いに戸惑った、特にアップデート
  (REST　API　を使用し少し強引に実装しました)
・値を更新すると自動で再描写