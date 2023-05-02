export type ApiError = {
    code: number;
    message: string;
    detail: string;
}

export const getErrorMessage = (error: ApiError | undefined) => {
  if (error?.code === 401) {
    return 'ログインに失敗しました。入力内容を確認してください。'
  } else if (error?.code === 403) {
    return '認証に失敗しました。ログインし直してください。'
  } else if (error?.detail === 'invalid nonce') {
    return '不正なQRコードか、有効期限が切れています。\nQRコードを表示し直してもらってください。'
  } else if (error?.detail === 'ticket already used') {
    return '既に利用済みのチケットです。\n一覧画面から利用状況を確認してください。'
  } else if (error?.detail === 'shop is not active') {
    return '有効な店舗ではありません。運営にお問合せください。'
  } else if (error?.code === 404) {
    return '見つかりませんでした。'
  } else if (error?.code === 405) {
    return '許可されていない操作です。'
  } else if (error?.code === 400) {
    return `不正なアクセスと判断されました。運営にお問合せください。\n(${error?.message}:${error?.detail})`
  } else if (error?.code === 500) {
    return `システムエラーです。運営にお問合せください。\n(${error?.message}:${error?.detail})`
  }
  return ''
}
