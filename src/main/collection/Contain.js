import _ from 'lodash'
import React from 'react';
import Board from './Board'
import Loading from './Loading'
import Form from './form'
import Menu from './Menu'
import Topbar from './Topbar'
import Service from './actions/service'
const default_dep = "/"
class Component extends React.Component{
  constructor(props) {
    super(props)
    let main = props.match.params.main ? props.match.params.main : default_dep
    let path = props.match.params[0] !== "" ? props.match.params[0] : ""
    let tag = main === "t" ? path : props.match.params.tag !== "" ? props.match.params.tag : ""
    let postid = props.match.params.id ? props.match.params.id : ""
    let formOn = postid && postid !== "" ? true : false
    // props.match.params.main = main
    this.state = {
      refresh: true,
      loading: true,
      main,
      path,
      tag,
      postid,
      root: [],
      subs: [],
      posts: [],
      tags: [],
      formOn,
      filterOn: false,
      menuOn: false,
    }
    this.handleFilter = this.handleFilter.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.reloadMenu = this.reloadMenu.bind(this)
    this.loadData = this.loadData.bind(this)
  }
  componentDidMount() {
    this.reloadMenu()
    this.loadData()
  }
  componentDidUpdate() {
    const { params } = this.props.match
    const { postid, main, path, tag } = this.state
    let _main = params.main === main ? main : params.main
    let _path = params[0] === path ? path : params[0] !== "" ? params[0] : ""
    let _tag = main === "t" ? path : params.tag === tag ? tag : params.tag ? params.tag : ""
    let _postid = params.id === postid ? postid : params.id ? params.id : ""
    let formOn = _postid && _postid !== "" ? true : false
    if((_postid !== postid) || (_tag !== tag) || (_main !== main) || (_path !== path)) {
      this.setState({ postid: _postid, tag: _tag, path: _path, main: _main, refresh: true, formOn }, () => {
        this.loadData()
      })
    }
  }
  async reloadMenu() {
    let main, path
    let filters = {
      "filters": {
        "main": main,
        "path": path
      },
      "sorters": { 
        "limit": 10000, 
        "skip": 0, 
        "sort": { 
          "createdAt": 1 
        }
      }
    }
    const payload = await Service.collectionsFromRoot(filters)
    let { menu } = payload
    this.setState({ menu: menu })
  }
  async loadData() {
    this.setState({ refresh: false })
    this.setState({ loading: true, menuOn: false, filterOn: false, })
    let main = this.state.main
    let path = this.state.path && this.state.path !== "" ? this.state.path : ""
    // let fullpath = `${main}\\${path}`
    // console.log(fullpath)
    let filters = {
      "filters": {
        "main": main,
        "path": path
      },
      "sorters": { 
        "limit": 100, 
        "skip": 0, 
        "sort": { 
          "createdAt": 1 
        }
      }
    }
    const payload = await Service.collectionsFromRoot(filters)
    let { subs, menu } = payload
    let p_filter = {
      "filters": {},
      "sorters": { 
        "limit": 10000, 
        "skip": 0, 
        "sort": { 
          "_id": -1
        }
      }
    }
    const { tag } = this.state
    if(tag && subs.length > 0) {
      p_filter.filters = {
        "parents": {"$in": subs},
        "tags": {"$in": [tag.toUpperCase()]}
      }
    } else if(tag && subs.length === 0) {
      p_filter.filters = {
        "tags": {"$in": [tag.toUpperCase()]}
      }
    } else if(subs && subs.length > 0) {
      p_filter.filters = {
        "parents": {"$in": subs}
      }
    } else {
      p_filter.filters = {}
    }
    const _posts = await Service.postsByCollections(p_filter)
    const { posts, tags } = _posts
    this.setState({ loading: false, posts, tags, subs })
  }
  handleFilter() {
    this.setState({filterOn: !this.state.filterOn})
  }
  handleForm() {
    let status = this.state.formOn
    this.setState({formOn: !status})
    this.reloadMenu()
    if(status === true) {
      this.loadData()
    }
  }
  handleMenu() {
    this.setState({menuOn: !this.state.menuOn})
  }
  renderBody() {
    const { menuOn, filterOn, tag, tags, posts, postid, main, path, menu } = this.state
    let fullpath = !main ? `` : !path ? `${main}` : `${main}/${path}`
    let maindata = _.find(menu, { path: fullpath })
    let mainpost = _.find(posts, { _id: postid })
    return ( 
      <React.Fragment>
        <Topbar {...this.props} 
          main={main}
          menu={menu}
          path={path}
          tag={tag}
          tags={tags}
          items={posts} 
          mainid={maindata ? maindata._id : false}
          handleFilter={this.handleFilter} 
          handleForm={this.handleForm} 
          handleMenu={this.handleMenu}
          fullpath={fullpath}
        />
        <Menu {...this.props} 
          fullpath={fullpath}
          filterOn={filterOn} 
          menuOn={menuOn}
          mainid={maindata ? maindata._id : false}
          main={main}
          menu={menu}
          tags={tags}
          tag={tag}
          reloadMenu={this.reloadMenu} 
          handleMenu={this.handleMenu} 
          handleFilter={this.handleFilter} 
        />
        { this.state.formOn ?
          <Form {...this.props} 
            reloadMenu={this.loadData}
            handleForm={this.handleForm} 
            maindata={maindata} 
            mainpost={mainpost}
            menu={menu}
          /> :
          <Board {...this.props} 
            main={main}
            path={path}
            items={posts} 
            handleForm={this.handleForm}
          />
        }
      </React.Fragment>
    )
  }
  render() {
    const { loading } = this.state
    return loading ? <Loading /> : this.renderBody();
  }
}
export default Component;