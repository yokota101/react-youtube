import React, { useEffect, useContext} from 'react'
import VideoDetail from '../components/VideoDetail/VideoDetail'
import SideList from '../components/SideList/SideList'
import { Store } from '../store/index'
import { useLocation } from 'react-router-dom'
import { fetchSelectedData, fetchRelatedData } from '../apis/index'
import ScrollToTop from '../components/scrollToTop';

const Watch = (props) => {
    const { setGlobalState } = useContext(Store)
    const location = useLocation()
    const setVideos = async () => {
        const searchPrams = new URLSearchParams(location.search)
        const id = searchPrams.get('v')
        if(id){
            const [selected, related] = await Promise.all([fetchSelectedData(id), fetchRelatedData(id)])
            setGlobalState({type: 'SET_SELECTED', payload: {selected: selected.data.items.shift()}})
            setGlobalState({type: 'SET_RELATED', payload: {related: related.data.items}})
        }
    }

    useEffect(() => {
        setVideos()
        document.title = `【Watch】World Youtube Tour`;
        window.gtagPageview(props.location.pathname+location.search);
        // eslint-disable-next-line
    },[location.search])
    return (
        <>
            <ScrollToTop/>
            <VideoDetail />
            <SideList />
        </>
    )
}

export default Watch
