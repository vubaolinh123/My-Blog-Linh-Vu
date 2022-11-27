import React, { useEffect, useState } from 'react'
import { getAll } from '../api/categoryBlog';

const DataMenu = () => {
    const [dataMenu, setDataMenu] = useState();

    useEffect(() => {
      const getBlogOfCate = async () => {
        const data: any = await getAll();
        const dataFilter = data.filter((item: { status: number; }) => item.status === 1)
        setDataMenu(dataFilter)
      };
      getBlogOfCate();
    }, []);
  return dataMenu
}

export default DataMenu