import React, { useEffect, useContext } from 'react'
import { fetchPopularData } from '../apis/index'
import { Store } from '../store/index'
import VideoGrid from '../components/VideoGrid/VideoGrid'
import VideoGridItem from '../components/VideoGridItem/VideoGridItem'

const Top = (props) => {
    const { globalState, setGlobalState } = useContext(Store)

    useEffect(() => {
        fetchPopularData().then((res) => {
            setGlobalState({type: 'SET_POPULAR', payload: {popular: res.data.items}})
        })
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        document.title = `World Youtube Tour`;
        window.gtagPageview(props.location.pathname);
        // change description and rich result for SEO.
        // ...
      }, [props.location.pathname]);
    return (
            <VideoGrid>
                {
                    globalState.popular && globalState.popular.map((popular) => {
                        return (
                            <VideoGridItem
                            id={popular.id}
                            key={popular.id}
                            src={popular.snippet.thumbnails.high.url}
                            title={popular.snippet.title}
                            />
                        )
                    })
                }
            </VideoGrid>
    )
}

export default Top
