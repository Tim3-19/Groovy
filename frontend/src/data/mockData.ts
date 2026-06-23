export interface Song {
  id: string;
  title: string;
  artist: string;
  cover_url: string;
  audio_url: string;
  album: string;
  duration: string; // MM:SS format
  durationSec: number; // in seconds
  addedTime: string;
}

export interface Playlist {
  id: string;
  title: string;
  creator: string;
  cover_url: string;
  songIds: string[];
  description?: string;
  songCountText?: string;
}

export interface Artist {
  id: string;
  name: string;
  image_url: string;
  type: string;
}

export interface Category {
  id: string;
  title: string;
  bgClass: string; // color or CSS class
  bgColor: string;
  image_url: string;
}

export interface Activity {
  id: string;
  type: 'like' | 'create' | 'follow';
  title: string;
  time: string;
  cover_url?: string;
}

// 1. Core mock songs
export const mockSongs: Song[] = [
  {
    id: "song-1",
    title: "So Heavy I Fell Through the Earth (Algorithm Mix)",
    artist: "Grimes",
    album: "So Heavy I Fell Through the Earth",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbmqlxCbi3WowyGK_9GJ8VnMprTJBbscYVJVsJNjEYrAQCqW70NVWh0xeKc_NfTzYVZ6ZVDeW83UZsmv5sO5kYxk7XESwd7xdHcYwhcl7f2DfbleirqqwOixThXAbchrWWzZXhVcKOejgHIfBR9WJ7RPybn_OBPxus16aiU0oGVTHL-WHxS2B07fiFvtDqHlYFltlqjJVY_Sw38tkgEYN3rCY5QQ7LIPAVZDHlHLhIm5MdGxL-WAJmD6QoTNvj354F2nd-6eDFo3OF",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:52",
    durationSec: 232,
    addedTime: "20 minutes ago"
  },
  {
    id: "song-2",
    title: "WISH FEAT. KIDDO MARV",
    artist: "Denzel Curry, Kiddo Marv",
    album: "ZUU",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZYuGEeAIlTdLQA2uwEG0kuadXSKqrXQohAw8_1a-FT8kjRsruqk3KwGnhBCoq-yz7bCPIomQiIZtOIuyalppOttJdm1s3E1tZ3RrrsqBuQRtLQbL8q2wwSCGQSojor2j5QWaG4_1-IXz0GDnFvDphzXlM3ZjOuxo_7dnhASle9Nq0i6_KtSvgj6OyBV9AEOvhdGmHF7ftHvcB384mS8Mx9wgrz9kTrkWiVQrqP5fQwn0Ws6al8h40TtjoFTTdekzqYl56n0cGxIB_",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "3:12",
    durationSec: 192,
    addedTime: "2 hours ago"
  },
  {
    id: "song-3",
    title: "Cayendo (Side A – Acoustic)",
    artist: "Frank Ocean",
    album: "Cayendo (Side A – Acoustic)",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3l16NOAP-MUqIR1aIu6FxfmAFluXPfjcZtNpSK_vPwLCDxOfVLcwIEiZBPylmbl02zLxf78C08zW-TwOjb61z8_WkaNVse0un4JI2sjEhOP0gOXpIYokRWKcSgzsrp3KP3DuU4z4M2SqXnZbBAWNmRg8uEgoV0EmfJXZqLhGdtvv0kYHrfe-RHx_srCjf4RVIhfcNEx66ZiVxpctXuI5fhmWMUmzQvN604L9xgfsEzLZMizdTgHhiPvUa1zI5GsNdt9zRpGOQAuoo",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "2:47",
    durationSec: 167,
    addedTime: "Yesterday"
  },
  {
    id: "song-4",
    title: "WDPK 83.7 FM",
    artist: "Daft Punk",
    album: "Homework",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzbjkqw-71rvV9gKWnvfyFpO2PjxnlHruGXD0jRARmvLA_okJy0wKj_JPRQOIfja108-zdUdW02sDmaT8N3Of5yAq9noyqDbnwbOVG6OKBAQQxL92N0GgXPCQ4OLHXt1F4p282XTGX3PVjxW0A2YhSdM5z8UU_jsBu3J_5TLjhDgGU_I3W7aVhgxmwBafWWGutSvPFXy_OBAxa_5lZCheruT_L4TvuEGYaQcbQ5nINiDJPMLwIhl-rQ7Fof5C8TwZbOXMQvH5nxZ5u",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "0:28",
    durationSec: 28,
    addedTime: "Yesterday"
  },
  {
    id: "song-5",
    title: "Say It",
    artist: "Flume, Tove Lo",
    album: "Skin",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtlUhYTNr6EcZr4VnEivYJ0LAEiIj-WNLtDFMKAE6zc_r0k7cnL9g91KXuxdr-JrSZuZ9KhLhhvnkvmWh3F9i6Osm9cj_4l9O5G2tbNbmDG4q19xHYt1YwKNrSN1eluLpJ0EPDsGEP8YS52JNbzhjGcGKeNbNz2R3YrduxZtGvU6SVMcPjeC3p-uFCibVgJh_7O_x6nbKUzakclYN9i8BdZOy3jOoBfRBHUD9qKAz0SOndvy6kU6Lviu4E0Je-TE-GMAimCALxteav",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "4:22",
    durationSec: 262,
    addedTime: "2020-05-27"
  },
  {
    id: "song-6",
    title: "Mitsubishi Sony",
    artist: "Frank Ocean",
    album: "Endless",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_0atnMuqanQs_WdqWaU6yI0sWF4jWnsxSl25m_mT47_gjN4o5lUgNDpDd2BjsLc09nZt6hvlul9rLSI7LVJ6a0SbBaFfipyhqzylVzlSmwhvGoLcjfwIMhAnpcwwi6g9OTvJaWhLLBok4PNi1Jn8XVtOmVadQERZgHpOKbpBXvpkKu9U-f_IwV4rG9jDRMmRWxOFwAvs4RT4qp8RE8W8ejAVb2CVrAPbug1fufxdMxlDznMI0nnGh1WAeVGau93UVrVHSwc1_9xZL",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "2:26",
    durationSec: 146,
    addedTime: "2020-05-27"
  },
  {
    id: "song-7",
    title: "THE SCOTTS",
    artist: "THE SCOTTS",
    album: "THE SCOTTS",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzKJmCbqJPCRqJbi71Tc8N3BnEukIjz10chMASen1cuqUpaoco5jbJkpmO5EjPRkjYH0TEbjyyn-E2wqu4ms2CZDGhqe_EYWz88ZxbCNmXI8VJvqj6AclEIZpLZipl63RyifEqQ51FsXGUQy4wxuPXJprc-NelGIw8PBw3kbJH34PQr6x1SLyjbyOdGVoKQzN93smXTYi_-9aGvpB9Z7R9UtEwaNI8LMHfvcoDzHwRwhn9yvx-wPJtgUL0HBCP6rqXV4gqdaxIy6RM",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: "2:46",
    durationSec: 166,
    addedTime: "2020-05-26"
  },
  {
    id: "song-8",
    title: "New Slaves",
    artist: "Kanye West",
    album: "Yeezus",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuArNKPCi5rkUE6PjhdH0Mkr6WNmIOdxSHx6kXq2bGsZh76rzSdW6K-kzkc9s9BZJplIqFoEGM9g_hc92h0GNQf3IBgRoMv7QvaaSGupR4J8Yv78aZ7TgXwXVFJlrafwAHf0cASQx7E3HAflzdZHugAK9KGxcRSt0rDwiH9V1Xr5cZ4gmCm2uNHPA18B-Mr7ZozGAWE4JYhygROIGVqp78kXwOQaYtu2TUaR8FBp3JLtWvCZM18q1OV5MJQwOPtrzbWqmHdlCZDdFPTi",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: "4:16",
    durationSec: 256,
    addedTime: "2020-05-20"
  },
  {
    id: "song-9",
    title: "Cudi Montage",
    artist: "KIDS SEE GHOSTS",
    album: "KIDS SEE GHOSTS",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSlP9SRpauN41_K6M66c7obxHthJfcgt0PjD1qcoWrOt9ngl0muYuFU4bJ9KzTz8ULOrMMQZo7ThdmBv_5u6uQ_jDuy8Eu5E_CNkhXZRurPy_rE0F8O8v7jfQSI7d6-Y8tM0h2TzgXzWf-pDZCly6PMAT4McgR3OnD-9wuhyPzob1JyLiuRX8WfPc3cxpaLIue9uHI4O1VI4wLEGJHKgeWG9OWtmjh9RIqTUfwSwqRYKeP5uJGkDAeshfVsy7z3Qr4ffrlG9BEX37A",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: "3:17",
    durationSec: 197,
    addedTime: "2020-05-17"
  },
  {
    id: "song-10",
    title: "Endless Vibes",
    artist: "Frank Ocean",
    album: "Endless",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSlP9SRpauN41_K6M66c7obxHthJfcgt0PjD1qcoWrOt9ngl0muYuFU4bJ9KzTz8ULOrMMQZo7ThdmBv_5u6uQ_jDuy8Eu5E_CNkhXZRurPy_rE0F8O8v7jfQSI7d6-Y8tM0h2TzgXzWf-pDZCly6PMAT4McgR3OnD-9wuhyPzob1JyLiuRX8WfPc3cxpaLIue9uHI4O1VI4wLEGJHKgeWG9OWtmjh9RIqTUfwSwqRYKeP5uJGkDAeshfVsy7z3Qr4ffrlG9BEX37A",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: "2:50",
    durationSec: 170,
    addedTime: "2020-05-10"
  },
  {
    id: "song-11",
    title: "Hyperpop Oasis",
    artist: "Sophie",
    album: "Oil of Every Pearl's Un-Insides",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH1btSSMjeNMj-8M3kra5K8A-sOxnKkJjJGRUsAqWk30Lo3AsghuGoxPs7ye17_vFRuOMbgCege3cGSsp-g7sh5pSDGr3aocVj8iCOXUYFCMgXm-IuFuNSTTlGsov4zR5gOcE3jElDgGKrnn1B5h-ahABUaY-l7C5DyIbgHTe7Depzzj6xHT1RHkhVClsqakylVBjWFb983N1BvdPU30lz-vUhUi3ZNGC1Y0npSNhKP7kOIeTxO9otbbe8T9JoJAp2zm_krumgKwer",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    duration: "3:40",
    durationSec: 220,
    addedTime: "Just now"
  },
  {
    id: "song-12",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnlxKasgqcgRW7ZZNnqhGwdePbbuL6h2couVjqWh0-5KfxQFcPNM9mdJiCvuSQgPQfVYepSj3eBPg2p1djVLO7O6CMlXibadBArIspxs895rkCnei_cNJSgT4zqItZVgrYYw5sDdmB70e0whJeTr_G1NLxtY4TcsyKw49nerGJ7OswgniJd8ASQAl8CuYfJnAhYaoM21iOSgpXNRCilRLSkFsZXOPD0rCMvEcDdrql3X4FF0iudJJBLvWGdCzc1P5KxeiOoYmUMrWK",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    duration: "4:03",
    durationSec: 243,
    addedTime: "Just now"
  }
];

// 2. Playlists
export const mockPlaylists: Playlist[] = [
  {
    id: "playlist-1",
    title: "Pure Fire!! 1",
    creator: "Wolfgang Mozart",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5j5gEBmFbWa4WsWFDeCDeVdQYoONPfTEeVTMW9N8W6xonJ6os02MqDjOC9QL36v9J7GCCxeZ9xZFhrxGfuIA9uw11-i656DruMZeEQbBb8agUfk-p-wB0JOISbmcgL6y07hLt7EJPVRz40DSTNv-6U74xv_zwQ3fohgNYynESdEYPZ_hLA-mRfRB0OaZTj-pMtP6d1Fa0IS3gPJ21gLWZMaU7lSp8njyyGzheIrYyhjDCQ0kGY015CqNryS22anNeofN2evisb5H",
    songIds: ["song-1", "song-2", "song-3", "song-4", "song-5", "song-6", "song-7", "song-8", "song-9"],
    description: "Hot releases lighting up the charts. Curated for the absolute night-mode music luxury experience.",
    songCountText: "9 Songs, 27 mins"
  },
  {
    id: "playlist-2",
    title: "Inspired Echoes",
    creator: "48 tracks",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-GW5zP1Q7ARxzaf6ZqdPKuwOUW2WIQvkPx_uH6TlF9_q0E2659-c4fmqEONFXhhU2UfwazsP0d2py5PouRBJStFfLjpy0spJv2bm2A3bQ2u-J1AkZUvpfU839hzLcKNa2KXJE7i55XhAPUCwZF8zwltbjk_bapinO75fC6yBF5R9igSHdjD5w8NVTz2WdCPpWPFor5VsYeDcR7rKifqHEAerFavS7dmbi_midtNXMo5e3VYWp2b50w9dpKGYKaxjoPH_uFVfSNxFF",
    songIds: ["song-2", "song-5", "song-9"],
    description: "Inspiring synthesizers and atmospheric builds.",
    songCountText: "3 Songs, 10 mins"
  },
  {
    id: "playlist-3",
    title: "Classic Rewind",
    creator: "Multiple Artists",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzNamJZDEO4buSyHBlnuza6QXtuluNWJFyJ8aOxW09YdP7XhS6CKN_LoJqYMTv2hMsZ2nOPUVmXe9dMaNi6tRaUTOrYmX_2BzJGEM-n5cxA_j2lN_hlYR7sNlVnA9ZAZAzAer5lci753i18ZqAes4c3XhxdF3bNBwWfnfxDl_dvK6V_hUiLK9wOXLYdDCzaBs1XC0qIpHHEIbc5dDduRS4vOJawPWBGAki6aiMzTh2UPIMhg6LdH3ztZ0qv9hb9IDtvYDoYIVQ-WJd",
    songIds: ["song-4", "song-6", "song-8"],
    description: "Nostalgic cassettes and vintage grooves.",
    songCountText: "3 Songs, 7 mins"
  },
  {
    id: "playlist-4",
    title: "Deep Calm",
    creator: "Wolfgang Mozart",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhm5_Hek1skG9zjK55k8v-Et1ovB8lrkALgJ5XPgOtBkzczWu0xdd8OO3hcZ586fK68jBbM5M08PD2rY-yn0EmhGoHtCzktHJxe8XZS_F22RpTbQLlHZPuoZuWFqdfZtFXKxpO3umsX3CAVqZpEqViz_7f6FfihrAJK7IEWme2QVrXlw65lAcHvN00peSKGCak4-OL1ah1EnSMiIRCGvDkmJiegu5FbTaQD_-QIRT5PMG2cg1fK2vJsCZAATlwgSrM3k-QXoXChIoq",
    songIds: ["song-3", "song-10"],
    description: "Deep relaxation under a quiet sky.",
    songCountText: "2 Songs, 5 mins"
  },
  {
    id: "playlist-5",
    title: "Synth Wave",
    creator: "Wolfgang Mozart",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeAAovPz4mN3pLgJWvIdBaAF2RyePjDjhENHz4oqGtKBT-xjwekjM-jC8aJiKo4ycQFJX7PZQ_rOEztjHgk-ISkWfhPDdFqN5lyxIhJusJl06syvt1MLHw4VPlw22nnTICxyY-12A8QgBvWS9aBZvEzHZ0dyTFLNOxgw3JDPuCZBV2qisZZ52VbDlPMsowQQbN3eEkERW-I2AJAjnFf8JmQ1k0FZ1AzTJ-OYS4oD-oIdqvDgDF7_CmNPZTtaxB0fa5o6fODNneIHMS",
    songIds: ["song-1", "song-5", "song-7"],
    description: "Distorted geometry and fluid cyber tempos.",
    songCountText: "3 Songs, 11 mins"
  },
  {
    id: "playlist-6",
    title: "Forest Vibe",
    creator: "Wolfgang Mozart",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDswYV2ivakR0H-iJA1bS_wlf4RxOyJKwgF_z8Xt9V8crlKrYV8ldXTuvwepmXF_KRYaxAQtWBfTarmLrf_semLUY5CMn8G7sRzqGX75RXmfhLaG9Ka-2_hpRjPbKuy4eJ7ADJPyFRS0oCvDtcLuIO_IuHdLHAyy0FdVC-5e-Gn0J7TyTK8annG5FY1jwNjGfgCS1goSj1sdfN1M_dd7tSjOJhCckErhg1zkwxDEWPKjsJ5NNFLNMaBUAnHvEYITncplbYRx7e-bm1k",
    songIds: ["song-3", "song-9"],
    description: "Ethereal, earthy forest music.",
    songCountText: "2 Songs, 6 mins"
  }
];

// 3. Artists
export const mockArtists: Artist[] = [
  {
    id: "artist-1",
    name: "Grimes",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3g18tdliMw7QsOWTrq-yrsvj2s70JO1LB9Hh68Dzh62LezRhcjbSwQfQ8DNRA_YBjTf2L3MbZ12RLsU_TsgRCQ084VgxROwZ1U8T8Jmssc5zxZFcRfIfLtVyf3o5XxLRh7t_SfFJ7LvGIVu7eqvdcgHPEdck6JBMv5BpUTdiRblGs1whK9Wd6uLvvEpIkf7uPqHW12CIaH5xhBCnAH-nS0_ytAdG8lWIjj1C79Z6pKEPTXV_lop2n_Pgq9DyYggQXg1xXTOwcI5qL",
    type: "Artist"
  },
  {
    id: "artist-2",
    name: "Frank Ocean",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2D2bi2DUaU5z_50F-RneIBm-FMHc0dWnBtaSSpb0OUecnskU5SUtF3My11gb85XM8K_SRs3rTasDLfU6oj9rHbbYHmwkoVuHINBNuW4LHwPSEOG5KEOaTvortZJbpSJeHK-pOKBLUlC26d24qxibI_nq0IwOFvDPNO8WIhoIqwAACWsxAiteIFAd4uIZFYfQqRPVY0V20CaFObvE0A2VfmWd_VrM-44axNaT3Anz_bZ01cDDgWPkTcZMC2G467_eljpoHT9eDwrZx",
    type: "Artist"
  },
  {
    id: "artist-3",
    name: "Daft Punk",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzbjkqw-71rvV9gKWnvfyFpO2PjxnlHruGXD0jRARmvLA_okJy0wKj_JPRQOIfja108-zdUdW02sDmaT8N3Of5yAq9noyqDbnwbOVG6OKBAQQxL92N0GgXPCQ4OLHXt1F4p282XTGX3PVjxW0A2YhSdM5z8UU_jsBu3J_5TLjhDgGU_I3W7aVhgxmwBafWWGutSvPFXy_OBAxa_5lZCheruT_L4TvuEGYaQcbQ5nINiDJPMLwIhl-rQ7Fof5C8TwZbOXMQvH5nxZ5u",
    type: "Artist"
  },
  {
    id: "artist-4",
    name: "Kanye West",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzMw5RDheQ-C4VyCGbn6hmvXlmQqY2SsEEwoOSb2N0S_VpHGb4CCq4tlvmitMV94GGGN-VSCE57vaYz9wEQWiPN5GicqsorirvKkQcoSSoaRrzNsOvs2QWjFmbLngbBGstJYSIdoPx4a8dXexq5vnKOzfG0UP27nIvfnXSWoG-SzVFRbcsnDkRYKi7x68ag_nkiOGGAuvTFx5adDW4AExHEIBTOaEJl6yVMXZOPq68krxe1N9TqtmJCnyTrGHQhxD0h_bw-8k9Ff8k",
    type: "Artist"
  },
  {
    id: "artist-5",
    name: "Sophie",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH1btSSMjeNMj-8M3kra5K8A-sOxnKkJjJGRUsAqWk30Lo3AsghuGoxPs7ye17_vFRuOMbgCege3cGSsp-g7sh5pSDGr3aocVj8iCOXUYFCMgXm-IuFuNSTTlGsov4zR5gOcE3jElDgGKrnn1B5h-ahABUaY-l7C5DyIbgHTe7Depzzj6xHT1RHkhVClsqakylVBjWFb983N1BvdPU30lz-vUhUi3ZNGC1Y0npSNhKP7kOIeTxO9otbbe8T9JoJAp2zm_krumgKwer",
    type: "Artist"
  },
  {
    id: "artist-6",
    name: "M83",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnlxKasgqcgRW7ZZNnqhGwdePbbuL6h2couVjqWh0-5KfxQFcPNM9mdJiCvuSQgPQfVYepSj3eBPg2p1djVLO7O6CMlXibadBArIspxs895rkCnei_cNJSgT4zqItZVgrYYw5sDdmB70e0whJeTr_G1NLxtY4TcsyKw49nerGJ7OswgniJd8ASQAl8CuYfJnAhYaoM21iOSgpXNRCilRLSkFsZXOPD0rCMvEcDdrql3X4FF0iudJJBLvWGdCzc1P5KxeiOoYmUMrWK",
    type: "Artist"
  }
];

// 4. Search Categories
export const mockCategories: Category[] = [
  {
    id: "cat-pop",
    title: "Pop",
    bgClass: "bg-primary-container",
    bgColor: "#ff571a",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH1btSSMjeNMj-8M3kra5K8A-sOxnKkJjJGRUsAqWk30Lo3AsghuGoxPs7ye17_vFRuOMbgCege3cGSsp-g7sh5pSDGr3aocVj8iCOXUYFCMgXm-IuFuNSTTlGsov4zR5gOcE3jElDgGKrnn1B5h-ahABUaY-l7C5DyIbgHTe7Depzzj6xHT1RHkhVClsqakylVBjWFb983N1BvdPU30lz-vUhUi3ZNGC1Y0npSNhKP7kOIeTxO9otbbe8T9JoJAp2zm_krumgKwer"
  },
  {
    id: "cat-elec",
    title: "Electronic",
    bgClass: "bg-surface-container-highest",
    bgColor: "#44302a",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnlxKasgqcgRW7ZZNnqhGwdePbbuL6h2couVjqWh0-5KfxQFcPNM9mdJiCvuSQgPQfVYepSj3eBPg2p1djVLO7O6CMlXibadBArIspxs895rkCnei_cNJSgT4zqItZVgrYYw5sDdmB70e0whJeTr_G1NLxtY4TcsyKw49nerGJ7OswgniJd8ASQAl8CuYfJnAhYaoM21iOSgpXNRCilRLSkFsZXOPD0rCMvEcDdrql3X4FF0iudJJBLvWGdCzc1P5KxeiOoYmUMrWK"
  },
  {
    id: "cat-rock",
    title: "Rock",
    bgClass: "bg-tertiary-container",
    bgColor: "#2492ff",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbjsZVoe2BHkppc-YaaHkZTZOPU7_xRDJXxph07aWwtuEEfczWdSx_CevU36gKadgQHIV3eQNJW_LeFMQpoxRsIXwVL6RvONZRAR3pmEqRq8SLSUfi64SPtO_EFwrjjwnUFKoZxl3rRVylR1PE76nui7km12PIAR3jzUCHyUuZNe1RxGAy4_EETVjn4ucoi9raP9ITTYj5K044MqobAXWWg3jHbpEApZn4_9u2TC-APo7tHUqAylIqyXTPYgA3lSHOBC1TfZYm08Oj"
  },
  {
    id: "cat-chill",
    title: "Chill",
    bgClass: "bg-secondary-container",
    bgColor: "#00e3fd",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHwifbBTJBhdbP5bUfh38Sci9XvhEg6QCMmp9dXql1g8314mGP2AVnJ0xgmmaiSQ4IhYV76JiZetXGs3BHfEjmKkAWYwK7CJqjt01OsidCytK8F9NRdt6N42yTsmS_YdGHcdjpwZUak8VyWhaiOfMrOTNMTA2nSjx7MMlxpbH34m-zAQ-Q4udg6GsdZ2x8G-h3aWZhdQ-FCZtvk1EsjS3agSHH-z42usqflSeUjI88zCniJbOPohmHqjpTHocftYCi_6-P9gASovFG"
  },
  {
    id: "cat-pure",
    title: "Pure Fire",
    bgClass: "bg-[#852400]",
    bgColor: "#852400",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTx8WV_x_SEJBw6Q3bt5gBeqTL5hjedrhtbkthSb4xCxXAKsPqTsRlNO4N0YakiUeQl49WUsOiVfdNORf6fiPPFhw28rVBg7I5qoTQhucwLsyCGp0iReuA-ZFn96dMkZw6W4gwJ14b3TUbPhtv0jVVN8I__CId4h8JN2T4ccqvl7MABByKuvxkPXoVCjPW2zJ1vIJlXX4F7Y7tKocKp1RQStJvm_y6BBMZFeALnrYET8bpLOKkA9lzXhc4QOgkTpnSpb5YFODKLVDa"
  },
  {
    id: "cat-nost",
    title: "Nostalgia",
    bgClass: "bg-[#004785]",
    bgColor: "#004785",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPjNiut9pYvKpN3mjps6PNBwth6UW5t0qrInBACy-3qLy2AtYAjfeW0KWtP9-bsilj0AfV8ES225o3f6etrxe5zV_o4S4DHJ53Vi0auNPvU6whpkxn6YnH2X0YKNVau9c4pCKTpE0YQ42bBOCbVpFM3YxdkJXTqY3ABKlU6PDGgHd4IiWBqMKqSp3yecgcHxSu_l4Uepya4-cQpRFhjrV2BbnnSA5ZeXVM7L3JpRlt3gTUUxkCk2TxarrP3FamuRKzUSawYkcmJ0OS"
  },
  {
    id: "cat-lofi",
    title: "Lo-Fi",
    bgClass: "bg-surface-container",
    bgColor: "#2d1b16",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW24C7hEJVsE1-aSD2QNVLiR-TgxAGajzRkOr-0d_PC4SWXC4VlaKBbXT63X886NONGkL1b2oKqFQaBECVEZzgA6I6G6_dj9F1cnd3r7xX2fbUpClSS8QP0CcLSraZ1AAIK9t3vP9Tb-3rnJW7CxgPITVRVyatNBeaOC8f-mvY2JtvrVts_-1-Oh5l3-pqfosXVDU_KxslxwYbU6dxuzZhu7vOKRHMyfwQvI0EISdlMr4788y2tKuE2tFdpKl4LhA5Qon6mbpmvyJ4"
  },
  {
    id: "cat-work",
    title: "Workout",
    bgClass: "bg-on-secondary-fixed-variant",
    bgColor: "#004f58",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3th5roKaeGjYOOBkC7F50bYsPWH6eD9_r8RaigsuC49NnNv_Z9Af62Fqs1ZhTjeqSSCJ36V1FC4WuR51wm8hIwvDOUY0m9xCnWCxccS8MyzMJt-BL3G8u9PlKeJ6zKei3S9Vwk0XiTp8oL0gx2fSarvxjjYqmg5g1wdOBYs2Y178qiliQSYBcERi_OmlxSRlugO3Eg8F6lY7ge2HE3fqkVhGUEvURxPure8oPEjq7H72-nFYVUQFrPmbGW4ZgbxztgRXY2XKic903"
  }
];

// 5. Recent Activity Feed
export const mockActivities: Activity[] = [
  {
    id: "act-1",
    type: "like",
    title: "Liked 'So Heavy I Fell Through the Earth (Algorithm Mix)'",
    time: "20 minutes ago",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbmqlxCbi3WowyGK_9GJ8VnMprTJBbscYVJVsJNjEYrAQCqW70NVWh0xeKc_NfTzYVZ6ZVDeW83UZsmv5sO5kYxk7XESwd7xdHcYwhcl7f2DfbleirqqwOixThXAbchrWWzZXhVcKOejgHIfBR9WJ7RPybn_OBPxus16aiU0oGVTHL-WHxS2B07fiFvtDqHlYFltlqjJVY_Sw38tkgEYN3rCY5QQ7LIPAVZDHlHLhIm5MdGxL-WAJmD6QoTNvj354F2nd-6eDFo3OF"
  },
  {
    id: "act-2",
    type: "create",
    title: "Created playlist 'Midnight Drive'",
    time: "2 hours ago",
    cover_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr-YtesbZDs5LSjum0lPkQ086uIGcPv4fJ4QfE_RPDCdZ36EKVdEbxbCQhg3pFHJipMVYD-fb9zJhWSGMLYK7ovaA6CIuOnDg5hcEX9NrELleZ9u12XBMyMThFuYnfyDHneVk3vBsQwIl5aNvxmvbzHOB3Wd_yCPsXbF9resy70ZNjLWg9hh3fgXTbbK4p8oyLoP3mWkjmiGlqZuYVUqJdiG_2F_Vb3mFQn0tSQWxfhw7yRjOw4sSz83Od1PvYXZb7yIn6Emqybkxv"
  },
  {
    id: "act-3",
    type: "follow",
    title: "Followed 'Flume'",
    time: "Yesterday"
  }
];
