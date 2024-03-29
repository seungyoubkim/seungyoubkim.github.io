import React from 'react'

class Giscus extends React.Component {
  constructor(props) {
    super(props)

    this.commentsEl = React.createRef()
    this.state = { status: 'pending' }
  }

  componentDidMount() {
    const scriptEl = document.createElement('script')
    scriptEl.onload = () => this.setState({ status: 'success' })
    scriptEl.onerror = () => this.setState({ status: 'failed' })
    scriptEl.async = true
    scriptEl.crossOrigin = 'anonymous'
    scriptEl.src = 'https://giscus.app/client.js'
    scriptEl.setAttribute('data-repo', 'seungyoubkim/seungyoubkim.github.io')
    scriptEl.setAttribute('data-repo-id', 'R_kgDOHdL6mw')
    scriptEl.setAttribute('data-category', 'Announcements')
    scriptEl.setAttribute('data-category-id', 'DIC_kwDOHdL6m84CZ0Tt')
    scriptEl.setAttribute('data-strict', '0')
    scriptEl.setAttribute('data-mapping', 'pathname')
    scriptEl.setAttribute('data-reactions-enabled', '1')
    scriptEl.setAttribute('data-emit-metadata', '0')
    scriptEl.setAttribute('data-input-position', 'bottom')
    scriptEl.setAttribute('data-theme', 'light')
    scriptEl.setAttribute('data-lang', 'ko')
    this.commentsEl.current.appendChild(scriptEl)
  }

  render() {
    const { status } = this.state

    return (
      <div className="comments-wrapper">
        {status === 'failed' && <div>Error. Please try again.</div>}
        {status === 'pending' && <div>Loading script...</div>}
        <div ref={this.commentsEl} className="giscus" />
      </div>
    )
  }
}

export default Giscus
