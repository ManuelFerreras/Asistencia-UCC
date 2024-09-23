import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { codigo, token } = data;

    const res = await axios.post(
      "https://siuc2.ucc.edu.ar/wucc/wucc_web/transportador.php?p=TOKENREGISTRO",
      {
        pagina: "NP2PVWJ2D51GKT4JDU5B6K6N",
        cod: codigo,
        token: token,
        location: "-31.487207, -64.2401857",
      },
      {
        headers: {
          accept: "*/*",
          "accept-language": "en,en-US;q=0.9,sl;q=0.8,es;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          origin: "https://age.ucc.edu.ar",
          priority: "u=1, i",
          referer: "https://age.ucc.edu.ar/",
          "sec-ch-ua":
            '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
      }
    );

    return NextResponse.json(await res.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
