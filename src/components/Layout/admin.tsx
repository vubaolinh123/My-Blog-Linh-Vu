import React from 'react'
import { LayoutProps } from '../../models/layout'
import Navbar from '../admin/Navbar'
import Sidebar from '../admin/Sidebar'
import 'antd/dist/antd.css';
import { Breadcrumb, Layout } from 'antd';
import PrivateRouter from '../PrivateRouter';
const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin = ({ children }: LayoutProps) => {
  return (
    <PrivateRouter>
      <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout className="site-layout">
              <Navbar />
              <Content style={{ margin: '0 16px' }}>
                  {children}
              </Content>
              <Footer style={{ textAlign: 'center' }}>Copyright ©2022 Created by Ann Anh</Footer>
          </Layout>
      </Layout>
    </PrivateRouter>

  )
}


export default LayoutAdmin