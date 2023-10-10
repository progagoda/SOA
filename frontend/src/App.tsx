import React, { useState } from 'react'
import './App.css'
import { MainPage } from './pages/mainPage'
import { Switch, theme } from 'antd'
import {ConfigProvider, Layout} from 'antd'

function App() {
  const [currentTheme, setCurrentTheme] = useState('Dark')
  const changeTheme = ()=>{
    if(currentTheme==='Light'){
      setCurrentTheme('Dark')
    }
    else{
      setCurrentTheme('Light')
    }
  }
  return (
    <ConfigProvider
      theme={{

        algorithm: currentTheme==='Light'? [theme.defaultAlgorithm, theme.compactAlgorithm] : [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Layout className='layout'>
        <Switch style = {{width: 80 , margin:10}} onChange={ ()=>changeTheme() } checkedChildren={ currentTheme } unCheckedChildren={ currentTheme } />
      <MainPage/>
      </Layout>
    </ConfigProvider>)
}

export default App
