import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import Editor from '../../components/admin/Editor/Editor';
import styles from "../../styles/PageDetail.module.css";

type Props = {}

const TestPage = (props: Props) => {
    const [data, setData] = useState("");
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const KEY = process.env.NEXT_PUBLIC_IFRAMELY_API_KEY

    useEffect(() => {
      setEditorLoaded(true);
      
    }, []);

    

  return (
    <div>
        <Editor
          name="ckeditor"
          onChange={(data: any) => {
            setData(data);
          }}
          htmlData={data}
          editorLoaded={editorLoaded}
        />
         <div className={styles["detail-page"]} dangerouslySetInnerHTML={{ __html: data }}></div>
         <br></br>
         {data}
    </div>
  )
}

export default TestPage