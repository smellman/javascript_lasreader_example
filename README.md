# Javascriptで読む点群

[FOSS4G 2020 Japan Online](https://www.osgeo.jp/events/foss4g-2020/foss4g-2020-japan-online/foss4g-japan-2020-online-coreday) での発表用サンプルプログラムです。

`lasreader.js` と `lasreader_simple.js` の2つがありますが、いずれも同じ実装で、前者が`Promise`を使った処理となります。

## 動作確認サイト

- `lasreader.js`
  - https://smellman.github.io/javascript_lasreader_example/
- `lasreader_simple.js`
  - https://smellman.github.io/javascript_lasreader_example/index_simple.html
  
LASデータを地図にドラッグすると左にメタデータを表示し、LASデータの範囲が画面に表示されます。