/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import React from 'react'

type Props = {
    title?: string 
    desc?: string 
}

const HeadMeta = ({title, desc}: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"/>
      <link rel="shortcut icon"  href="/rounded-avatar.png" type="image/x-icon"/>
    </Head>
  )
}

export default HeadMeta