import React, { useState } from 'react'
import { Button, Divider, Drawer } from 'antd'

export const SecondService = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Divider> Space marines collection</Divider>
      <Button type="primary" onClick={ showDrawer } style={{ marginBottom: 16 }}>
        Create
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={ onClose }
        open={ open }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}
