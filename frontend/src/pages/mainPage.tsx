import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { FirstService } from '../components/firstService/fistService'
import React from 'react'
import { SecondService } from '../components/secondService/secondService'
import { Diagram } from '../components/diagram/diagram'

export const MainPage: React.FC = () => {
  const onChange = (key: string) => key
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'First Web Service',
      children: <FirstService />,
    },
    {
      key: '2',
      label: 'Second Web Service',
      children: <SecondService />,
    },
    {
      key: '3',
      label: 'Scheme',
      children: <Diagram />,
    },
  ]
  return <Tabs defaultActiveKey="1" items={ items } onChange={ onChange } />
}
