import React, { useState, useEffect } from 'react';
import _ from 'lodash'

class WrapComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { propkey: false }
  }
  componentWillReceiveProps(prevProps) {
    const props_key = this.props.location.key
    this.setState({ propkey: props_key })
  }
  render() {
    return <Component {...this.props} propkey={this.state.propkey} />
  }
}

const Component = (props) => {

  // const [ content, setContent ] = useState("")

  const handleInitz = () => {
  	console.log("initz")
  }

  useEffect(() => handleInitz(), [props]);

  return (
  	<p>oi</p>
  )
}

export default WrapComp