import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { FirstService } from '../components/firstService/fistService'
import React from 'react'
import { SecondService } from '../components/secondService/secondService'

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
  ]
  return (
      <Tabs style={{padding: 20}} defaultActiveKey="1" items={ items } onChange={ onChange } />
  );
}
