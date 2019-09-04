import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash'

import Wrap from './Wrap'

import Service from '../actions/service'
import { Collection } from "../actions/reducer";

const Component = (props) => {
  
  const { state, dispatch } = useContext(Collection)
  const { dptos, links, lkdta} = state
  const { content, isnew, logged } = props
  const { main, postid } = content
  const [ edition, setEdition ] = useState(isnew)
  const [ editstp, setEditstp ] = useState(isnew ? "A": "B")
  const [ fields, setFields ] = useState({ parents: [], tags: [] })
  const [ fvalid, setFvalid ] = useState(false)

  const changeStep = () => props.history.goBack()
  const handleEdit = () => props.history.goBack()
  
  const handleGoBack = () => {
    
    isnew && editstp === "B" ?
      setEditstp("A") :
        !isnew && edition && editstp === "B" ?
          setEdition(false) :
            props.history.goBack()
  }
  
  const handleChange = (selected) => (event) => {
    const new_fields = fields
    new_fields[selected] = event.target.value
    setFields(new_fields)
    setFvalid(!fvalid)
  }
  
  const handleEdition = () => {
    setEdition(!edition)
    setEditstp("B")
  }

  const handleFields = (new_fields) => {
    setFields(new_fields)
    setFvalid(!fvalid)
  }
  
  const handleSubmit = () => {

    fields.link && 
    fields.title &&
    fields.parents &&
    fields.parents.length > 0 &&
      editstp === "B" &&
        saveData()

    fields.link &&
      editstp === "A" &&
        setEditstp("B")
  }
  
  const deleteData = () => {
    if(postid) {
      rmveData(postid)
    }
  }

  const saveData = async () => {
    const { title, local, rdate, link, tags, parents } = fields
    const data = { title, local, rdate, link, tags, parents }

    if(postid) {
      await Service.updateData(postid, data)
      functions.handleRflk()
      setEdition(false)
    } else {

      const callback = await Service.saveData(data)

      setEdition(false)

      const { _doc } = callback
      const path = `/p/${_doc._id}`
      props.history.replace(path)
    }
  }
  const rmveData = async (postid) => {
      await Service.removeData(postid)
      functions.handleBack()
      // functions.handleRlod()
  }

  const functions = { 
    ...props.functions,
    changeStep,
    deleteData,
    handleEdit,
    handleChange,
    handleFields,
    handleGoBack,
    handleEdition,
    handleSubmit,
  }

  // const fullpath = !main ? `` : !path ? `${main}` : `${main}/${path}`
  const fullpath = "/"
  const maindata = _.find(dptos, { path: fullpath })
  const mainpost = _.find(lkdta, { _id: postid })

  const handleInitz = () => {

    mainpost && fields && !fields._id &&
      setFields(mainpost)

    // console.log(postid, isnew, editstp, edition)
    // !postid && isnew && editstp === "B" && !edition &&
      // setEdition(true) && setEditstp("A") 
  }

  useEffect(() => handleInitz(state, dispatch), [props, state]);

  return (
    <Wrap 
      {...props}
      edition={edition} 
      editstp={editstp} 
      fields={fields} 
      fvalid={fvalid} 
      logged={logged} 
      content={content}
      functions={functions} 
      maindata={maindata}
      mainpost={mainpost}
      menu={dptos} 
    />
  )
}
export default Component;