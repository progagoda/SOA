import React, { useState } from 'react'
import './App.css'
import { MainPage } from './pages/mainPage'
import { App as AntdApp, ConfigProvider, Layout, notification, Switch, theme } from 'antd'
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios'

function App() {
  const [currentTheme, setCurrentTheme] = useState('Dark')
  const [api, contextHolder] = notification.useNotification()

  const changeTheme = () => {
    if (currentTheme === 'Light') {
      setCurrentTheme('Dark')
    } else {
      setCurrentTheme('Light')
    }
  }
  axios.interceptors.response.use(function (response) {
    api.destroy()
    api.success({
      message: `Success`,
    })
    return response;

  },  function(error) {
    api.destroy()
    api.error({
      message: `ERROR`,
      description: <>{ error.message }</>,
    })
    return Promise.reject(error);
  })

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
        <AntdApp>
          <Layout className='layout'>
          <Switch
            style={{ width: 80, margin: 10 }}
            onChange={ () => changeTheme() }
            checkedChildren={ currentTheme }
            unCheckedChildren={ currentTheme }
          />
          { contextHolder }
          <MainPage/>
          </Layout>
        </AntdApp>
      </ConfigProvider>
      <ReactQueryDevtools/>
    </>
  )
}

export default App
