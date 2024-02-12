import axios from 'axios'

const KEY = ''// youtube apiのAPIKEYをここに記載すること

const translateURL = '' // https://qiita.com/satto_sann/items/be4177360a0bc3691fdf を参考に作成
// 例：https://script.google.com/macros/s/XXXXXXX/exec

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
})
const params = {
    part: 'snippet',
    maxResults: 20,
    key:KEY,
    regionCode: 'US',
    type: 'video',//type channel or playlist or video
    order: 'viewCount',// リソースを再生回数の多い順に並べます。
    safeSearch: 'none',//セーフサーチ（制限されているコンテンツのフィルタリングなくす）を行うかどうか
    videoCaption: 'any',//字幕あるなし
    videoDefinition: 'any',//解像度のフィルタ
}

export const fetchPopularData = async () => {
    return await youtube.get('/videos', {
        params: {
            ...params,
            chart: 'mostPopular'//指定した地域で最も人気のある動画を返す
        }
    })
}

export const fetchSelectedData = async (id) => {
    return await youtube.get('videos', {
        params: {
            ...params,
            id
        }
    })
}

export const fetchRelatedData = async (id) => {
    return await youtube.get('/search', {
        params: {
            ...params,
            relatedToVideoId: id
        }
    })
}

/**
 * 指定の国の言語で翻訳を行う
 * 
 * @param {検索キーワード} searchWord 
 * @param {言語コード} langcode
 */
export const translateLangage = async (searchWord, langcode) => {
    console.log("翻訳API 内容→" + searchWord + "翻訳する国→" + langcode);
    return await axios.get(translateURL,{
        params: {
            text: searchWord,
            source: 'ja',
            target: langcode
        }
    })
}

/**
 * Youtube上で検索を行う
 * 
 * @param {*} searchWord 
 * @param {国コード} code 
 * 注意：国コードはYoutube検索、言語コードは翻訳時に使う。
 */
export const fetchSearchData = async (searchWord, code) => {

    return await youtube.get('/search', {
        params: {
            ...params,
            regionCode: code,
            q: searchWord
        }
    })
}