/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from './Navbar.module.css'
import axios from "axios";
import useColor from '../../../hooks/useColor';
import Link from 'next/link';




const Navbar: React.FC = () => {

  const [dataSettings, setDataSettings]= useState<any>()
  const [userAdmin, setUserAdmin]= useState<any>()
  const { getAllColor, detail, edit, error } = useColor();

  useEffect(()=>{
    const getAPI = async ()=>{
      const dataUser: any = JSON.parse(localStorage.getItem('user') || '{}')
      const [dataSetting]:any = await getAllColor()
      setDataSettings(dataSetting)
      setUserAdmin(dataUser)
    }
    getAPI();
  },[])

  const Logout = ()=>{
    const confirm = window.confirm('Bạn có muốn đăng xuất khỏi tài khoản admin không ?')
    if(confirm){
      localStorage.removeItem('user')
      location.reload();
    }
  }

  return (
    <>
      <div className={styles['nav-container']}>
        <div className=""></div>
        <div className=""> </div>
        <div className={styles['nav-action']}>
          <span>{userAdmin?.user?.name}</span>
          <img className={styles['nav__img']} src={dataSettings?.url}  alt="" onClick={Logout}/>
        </div>
      </div>
    </>
  )

}

export default Navbar