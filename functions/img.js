export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return new Response("missing url", { status: 400 });
  }

  const doubanRequest = new Request(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Referer": "https://movie.douban.com/",
      "Accept":
        "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "Accept-Language": "zh-CN,zh;q=0.9",
    },
  });

  const resp = await fetch(doubanRequest);

  if (!resp.ok) {
    return new Response("douban blocked", { status: 502 });
  }

  return new Response(resp.body, {
    status: 200,
    headers: {
      "Content-Type": resp.headers.get("Content-Type") || "image/jpeg",
    },
  });
}
