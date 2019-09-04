import _ from 'lodash'

import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

// const useScrollPosition = () => {
//   if (typeof window === "undefined") return 500;
//   // Store the state
//   const [scrollPos, setScrollPos] = useState(window.pageYOffset);
//   // On Scroll
//   const onScroll = () => {
//     setScrollPos(window.pageYOffset);
//   };
//   // Add and remove the window listener
//   useEffect(() => {
//     window.addEventListener("scroll", onScroll);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//     };
//   });
//   return scrollPos;
// };

// export default useScrollPosition;
class PaginationComp extends React.Component {
  constructor(props) {
    super(props)
    this.bcontn = React.createRef()
    this.scroll = this.scroll.bind(this)
    this.state = { should_paginate: false }
  }
  componentDidMount() {
    this.bcontn.current.addEventListener('scroll', this.scroll)
  }
  scroll() {
    const { offsetHeight, scrollHeight, scrollTop } = this.bcontn.current
    scrollTop + offsetHeight > scrollHeight - 50 ?
      this.setState({ should_paginate: true }) :
      this.setState({ should_paginate: false })

  }
  render() {
    const { should_paginate } = this.state
    // console.log(this.props.lodng)
    return (
      <div className="board-cont" ref={this.bcontn}>
        <Component 
          {...this.props} 
          is_loading={this.props.lodng} 
          should_paginate={should_paginate} 
        />
      </div>
    )
  }
}
const Component = (props) => {
  
  const { functions, content, items, should_paginate, is_loading } = props

  if(!items) return false

  // console.log(content.main)

  const p = { size: 18, actual: 1, len: items.length, main: content.main }
  const filtered = _.slice(items, 0, p.size)
  const [ pagination, setPagination ] = useState(p)
  const [ itfiltered, setItFiltered ] = useState(filtered)
  const [ shouldRfrs, setShouldRfrs ] = useState(false)

  // console.log(items.length, itfiltered.length, should_paginate, is_loading)

  useEffect(() => {
    
    const move_top = content.main !== pagination.main
    // console.log(should_paginate, is_loading, shouldRfrs, content.main, pagination.main, move_top)

    should_paginate && next_pagination()

    is_loading && setShouldRfrs(true)
    
    !is_loading && shouldRfrs && rlod_pagination(move_top)
    
  }, [should_paginate, is_loading, shouldRfrs])

  const rlod_pagination = (mvtp) => {
    // console.log(content.main, mvtp, p, pagination)
    // const { params } = content
    // const { scrollTp } = params
    // console.log(scrollTp)
    // if(!mvtp && content.main === "/" && scrollTp) {
      // console.log("movetotop")
    // }
    const { size, actual } = pagination
    const pg = { size: size, actual: mvtp ? 1 : actual, len: items.length, main: content.main }
    setPagination(pg)
    const len = items.length
    const end = size * actual > len ? len : size * actual
    const sliced = _.slice(items, 0, end)
    setShouldRfrs(false)
    setItFiltered(sliced)
  }

  const next_pagination = () => {
    let pg = pagination
    //console.log("next_pagination", pg.actual)
    pg.actual = pg.size * pg.actual > pg.len ? pg.actual : pg.actual + 1
    setPagination(pg)

    const { size, len, actual } = pagination
    const end = size * actual > len ? len : size * actual
    const sliced = _.slice(items, 0, end)
    setItFiltered(sliced)
  }


  const renderItems = () => {
    return _.map(itfiltered, (item, k) => {
      const slice = item.link.slice(-1) === "/" ? "" : "/"
      const img_src = (size) => `${item.link}${slice}media/?size=${size}`
      // let src = `${item.link}${slice}media/?size=${size}`
      // let main_path = !main || main === "0" || main === undefined ? "" : `/${main}`
      // let post_path = path ? `${main_path}/${path}/p/${item._id.toString()}` : `${main_path}/p/${item._id.toString()}`
      // <img src={img_src("l")} alt={item.name} />
      let post_path = `/p/${item._id.toString()}`
      return (
        <div className="post-card" key={k}>
          <Link to={post_path} onClick={() => functions.handleRfsh()}>
            <div className="card-wrap"></div>
            <div className="card-body">
              <LazyLoadImage
                alt={item.name}
                src={img_src("l")}
                effect="blur"
                key={k}
              />
            </div>
          </Link>
        </div>
      )
    })
  }
  return (
    <div className="board-body">
      { renderItems() }
    </div>
  )
      // <button onClick={() => next_pagination()}>next</button>
}
export default PaginationComp;