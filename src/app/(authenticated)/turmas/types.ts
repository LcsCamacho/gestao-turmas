export interface RequestFilmes {
  code: number;
  msg: string;
  page: number;
  pagecount: number;
  limit: string;
  total: number;
  list: Filme[];
}
export interface RequestFilme {
  code: number;
  msg: string;
  page: number;
  pagecount: number;
  limit: string;
  total: number;
  list: Filme;
}

export interface Filme {
  backdrop_path: string;
  poster_path: string;
  released_date: string;
  vod_score: string | number;
  vod_writer: string;
  vod_tag: string;
  vod_id: number;
  type_id: number;
  vod_play_url: string;
  vod_name: string;
  vod_pic: string;
  type_name: string;
  vod_content: string;
  vod_class: string;
  content: string;
  vod_actor: string;
  year: string;
  vod_time_add: number;
}
