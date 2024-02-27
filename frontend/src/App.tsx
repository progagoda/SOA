import React, { useState } from 'react'
import './App.css'
import { MainPage } from './pages/mainPage'
import { ConfigProvider, Layout, notification, Switch, theme } from 'antd'
import { ReactQueryDevtools } from 'react-query/devtools'
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
  axios.interceptors.response.use(
    function (response) {
      api.destroy()
      api.success({
        message: `Success`,
      })
      return response
    },
    function (error) {
      // eslint-disable-next-line
      const url = error.config.url
      api.destroy()

      if (url.includes('https://localhost:8082/api/v1/starships')) {
        api.success({
          message: `Success`,
        })
        return Promise.resolve()
      }
      api.error({
        message: `Network Error`,
        description: error.code
      })
      return Promise.reject(error)
    },
  )

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
        <Layout className={ 'layout' }>
          <Switch
            style={{ width: 80, margin: 10 }}
            onChange={ () => changeTheme() }
            checkedChildren={ currentTheme }
            unCheckedChildren={ currentTheme }
          />
          { contextHolder }
          <MainPage />
          <ReactQueryDevtools />
        </Layout>
      </ConfigProvider>
    </>
  )
}

export default App
