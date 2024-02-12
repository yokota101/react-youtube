import React, { useEffect, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchSearchData, translateLangage } from '../apis'
import { Store } from '../store/index'
import VideoGrid from '../components/VideoGrid/VideoGrid'
import VideoGridItem from '../components/VideoGridItem/VideoGridItem'

const Search = (props) => {
    const { globalState, setGlobalState} = useContext(Store)
    const [searchFlg, setSearchFlg] = useState(false)
    const location = useLocation()
    const setSearchResult = async () => {
        setSearchFlg(true)
        const searchParams = new URLSearchParams(location.search)
        const query = searchParams.get('query')
        const keyword = searchParams.get('keyword')
        const code = searchParams.get('code')
        const langcode = searchParams.get('langcode')
        const searchWord = query ? query : keyword

        if (searchWord && code && langcode) {
            await translateLangage(searchWord, langcode).then((res)=>{
                //console.log("res",res);
                //ここでエラーとかの場合も考えておく。翻訳出来ない場合も結構あるので、
                if(res.data.code ===200){
                  //翻訳に成功した場合
                    fetchSearchData(res.data.text, code).then((res) => {
                        setGlobalState({type: 'SET_SEARCHED', payload: {searched: res.data.items}})
                        setSearchFlg(false)
                    }).catch(error => {
                      alert('error:1 Youtube API LIMIT! 17時を過ぎれば復活します。')
                      setSearchFlg(false)
                  });
                }else{
                  //翻訳に失敗した場合した場合
                  alert('error:3 Google translate Error! 翻訳に失敗しました。')
                  setSearchFlg(false)
                }
            }).catch(error => {
              //翻訳に失敗した場合した場合
              alert('error:5 Google translate Error! 翻訳に失敗しました。')
              setSearchFlg(false)
            });

        } else{
          alert('想定外の操作です。')
          setSearchFlg(false)
        }
    }
    useEffect(() => {
        if(!searchFlg){
            //検索ボタンを連打されない対策
            setSearchResult()
            document.title = `【Search】World Youtube Tour`;
            window.gtagPageview(props.location.pathname+decodeURIComponent(location.search));
        }        
    }, [location.search])

    return (
            <VideoGrid>
                {
                    globalState.searched ? globalState.searched.map((search) => {
                        return (
                            <VideoGridItem 
                                id={search.id.videoId}
                                key={search.id.videoId}
                                src={search.snippet.thumbnails.high.url}
                                title={search.snippet.title}
                            />
                        )
                    }) :<span>no data</span>
                }
            </VideoGrid>
    )
}

export default Search
