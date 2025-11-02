import Header from '@/components/Header';

export default function UsagePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />

      <main className="grow">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="bg-white p-8 rounded-lg shadow-sm space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">主な機能</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-bold">イベントの作成・編集・削除</span>: タイトル、期間、場所、説明など、詳細なイベント情報を<br />登録・管理できます。</li>
                <li><span className="font-bold">繰り返しイベント</span>: イベントを週単位で簡単に複製できます。</li>
                <li><span className="font-bold">終日イベント</span>: 終日のイベントも設定可能です。</li>
                <li><span className="font-bold">複数選択＆一括削除</span>: 削除モードを有効にすると、複数のイベントを一度に選択して削除できます。</li>
                <li><span className="font-bold">CSVエクスポート</span>: 登録したイベントをGoogleカレンダーにインポート可能なCSV形式で出力します。</li>
                <li><span className="font-bold">データ永続化</span>: 作成したイベントはブラウザに保存され、ページをリロードしても消えません。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b pb-2 mb-4">基本的な使い方</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">1. イベントの作成</h3>
                  <p>画面左上の「作成」ボタンをクリックすると、イベント作成フォームが表示されます。<br />タイトル、開始日時、終了日時などの必須項目を入力し、「保存」ボタンをクリックします。</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">2. イベントの編集・削除</h3>
                  <p>各イベントカードの右側にある「編集」または「削除」ボタンをクリックします。</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">3. 複数イベントの一括削除</h3>
                  <p>画面上部の「複数削除」ボタンをクリックして、削除モードに切り替えます。<br />削除したいイベントカードをクリックして選択し（選択されたカードは青くハイライトされます）、「選択した項目を削除」ボタンで一括削除します。</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">4. CSVエクスポート</h3>
                  <p>「CSVエクスポート」ボタンをクリックすると、<span className="font-bold">events.csv</span>という名前のファイルがダウンロードされます。<br />このファイルはGoogleカレンダーの「設定」→「インポート/エクスポート」からインポートできます。</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}