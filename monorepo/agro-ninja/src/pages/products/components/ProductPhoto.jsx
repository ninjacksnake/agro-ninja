import React from 'react'
import { Image } from 'antd'

const ProductPhoto = ({photo, name}) => {
  return (
    <Image src={photo} alt={name} preview={false}/>
  )
}

export default ProductPhoto