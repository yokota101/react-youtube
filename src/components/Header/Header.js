import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Style from "./Header.module.scss"
import {useHistory } from 'react-router-dom'
import {selectKeywords, happyRank2019, GDP2020, REGION_GDP} from '../../data/index';

const Header = () => {
    const [term, setTerm] = useState('')
    const [selectedKeyword, setSelectedKeyword] = useState('音楽')
    const [countryList, setCoutryList] = useState([])
    const [countryCode, setCountryCode] = useState('')
    const [langCode, setLangCode] = useState('')
    const [selectBoxState, setSelectBoxState] = useState('gdp')

    const history = useHistory()
    const handleSubmit = e => {
        e.preventDefault()
        if(langCode === "ja"){
          alert("ぜひ日本以外で調べてみてください。");
          return
        }
        history.push(`/search?query=${term}&keyword=${selectedKeyword}&code=${countryCode}&langcode=${langCode}`)
    }

    useEffect(() => {
      if(selectBoxState === "gdp"){
        setCoutryList(GDP2020);
        setLangCode(GDP2020[0].langagecode);
        setCountryCode(GDP2020[0].code);
      }else if(selectBoxState === "happy"){
        setCoutryList(happyRank2019);
        setLangCode(happyRank2019[0].langagecode);
        setCountryCode(happyRank2019[0].code);
      }else if(selectBoxState === "region"){
        setCoutryList(REGION_GDP);
        setLangCode(REGION_GDP[0].langagecode);
        setCountryCode(REGION_GDP[0].code);
      }else {
        setCoutryList(GDP2020);
        setLangCode(GDP2020[0].langagecode);
        setCountryCode(GDP2020[0].code);
      }
      // eslint-disable-next-line
  }, [selectBoxState])

  function setCountryInfo(countryObj){
    const selected =countryList[countryObj];
    setLangCode(selected.langagecode);
    setCountryCode(selected.code);
  }

    return (
        <div className={Style.header}>
            <div className={Style.item}>
                <Link to="/">WorldTube</Link>
            </div>
            <div className={Style.item}>
                <form onSubmit={handleSubmit}>
                  <div className={Style.direct}>
                    <div className={!term ? Style.having : Style.nothave}>
                      <p className={Style.narabu}>検索→</p>
                      <select id={Style.select_box} onChange={(e) => setSelectedKeyword(e.target.value) }>
                          {selectKeywords.map((label,index) => (
                              <option key={index} value={label}>{label}</option>
                          ))}
                      </select>
                    </div>

                    <div className={term ? Style.having : Style.nothave}>
                      <p className={Style.narabu}>OR</p>
                      <input 
                      type="text" 
                      placeholder="日本語で自由に検索" 
                      onChange={e => setTerm(e.target.value)} 
                      value={term} />
                    </div>
                  </div>


                  <div className={Style.direct}>
                    <p className={Style.narabu}>国の並び順:</p>
                    <select onChange={(e) => setSelectBoxState(e.target.value) }>
                      <option value="gdp">GDP</option>
                      <option value="happy">幸福度</option>
                      <option value="region">GDP＆地域別</option>
                    </select>
                  </div>
                  <div className={Style.direct}>
                    <p className={Style.tate}>↓調べたい国を選んで検索ボタンプッシュ！</p>
                  </div>
                  <div className={Style.direct}>
                      <select id={Style.select_box} defaultValue="gdp"onChange={(e) => setCountryInfo(e.target.value) }>
                        {countryList.map((countryObj,index) => (
                            <option key={index} value={index}>
                              {countryObj.rank+"位:"+countryObj.name+"→"+countryObj.gengo+(countryObj.region&&"　地域→"+countryObj.region)}
                            </option>
                        ))}
                      </select>
                  </div>
                  <div className={Style.direct}>
                    <button type="submit"><FontAwesomeIcon icon={faSearch} />検索する</button>
                  </div>
                </form>
            </div>
        </div>
    )
}

export default Header