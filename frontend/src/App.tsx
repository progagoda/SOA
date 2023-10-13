import React, { useState } from 'react'
import './App.css'
import { MainPage } from './pages/mainPage'
import { ConfigProvider, Layout, Switch, theme } from 'antd'
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const [currentTheme, setCurrentTheme] = useState('Dark')
  const changeTheme = () => {
    if (currentTheme === 'Light') {
      setCurrentTheme('Dark')
    } else {
      setCurrentTheme('Light')
    }
  }
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm:
            currentTheme === 'Light'
              ? [theme.defaultAlgorithm, theme.compactAlgorithm]
              : [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <Layout className="layout">
          <Switch
            style={{ width: 80, margin: 10 }}
            onChange={ () => changeTheme() }
            checkedChildren={ currentTheme }
            unCheckedChildren={ currentTheme }
          />
          <MainPage />
        </Layout>
      </ConfigProvider>
      <ReactQueryDevtools/>
    </>
  )
}

export default App
