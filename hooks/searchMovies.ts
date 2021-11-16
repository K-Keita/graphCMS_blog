import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchMovies(query: any, pageNumber: any) {
  const [loading, setLoading] = useState<any>(true); // ローディングの判定
  const [error, setError] = useState<any>(false); // エラーを検知したらセットする
  const [movies, setMovies] = useState<any>([]); // 検索結果をセットする
  const [hasMore, setHasMore] = useState<any>(false); // 検索結果が残っているか判定する

  useEffect(() => {
    setMovies([]);
  }, [query]);

  // api呼び出し
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    const apikey = "hogehoge";
    axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: { api_key: apikey, query: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setMovies((prevMovies: any) => {
          return [
            ...new Set([
              ...prevMovies,
              ...res.data.results.map((b: any) => b.title),
            ]),
          ];
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
        console.log("then 成功です");
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
        console.log("catch errorです");
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, movies, hasMore };
}
